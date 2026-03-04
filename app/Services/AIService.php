<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class AIService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    public function __construct()
    {
        $this->apiKey = env('GOOGLE_API_KEY');
    }

    /**
     * Generate embedding for a given text using Gemini.
     *
     * @param string $text
     * @return array
     */
    public function generateEmbedding(string $text): array
    {
        if (empty($this->apiKey)) {
            Log::error('Gemini API Key is missing.');
            return [];
        }

        $response = Http::withoutVerifying()->post("{$this->baseUrl}/models/embedding-001:embedContent?key={$this->apiKey}", [
            'model' => 'models/embedding-001',
            'content' => [
                'parts' => [
                    ['text' => $text]
                ]
            ]
        ]);

        if ($response->failed()) {
            Log::error('Gemini Embedding Error: ' . $response->body());
            return [];
        }

        return $response->json('embedding.values') ?? [];
    }

    /**
     * Search products using vector similarity.
     *
     * @param string $query
     * @return Collection
     */
    public function searchProducts(string $query): Collection
    {
        $embedding = $this->generateEmbedding($query);

        if (empty($embedding)) {
            // Fallback to basic keyword search if embedding fails
            return Product::where('name', 'ilike', "%{$query}%")
                ->orWhere('details', 'ilike', "%{$query}%")
                ->limit(10)
                ->get();
        }

        $vectorString = '[' . implode(',', $embedding) . ']';

        // Perform pgvector cosine distance search
        // We join with the embeddings table and sort by distance
        // Assuming products have one primary embedding entry for description/name
        return Product::select('products.*')
            ->join('embeddings', function ($join) {
                $join->on('products.id', '=', 'embeddings.model_id')
                    ->where('embeddings.model_type', '=', Product::class);
            })
            ->selectRaw("embeddings.embedding <=> '{$vectorString}' as distance")
            ->orderBy('distance')
            ->limit(12)
            ->get();
    }

    /**
     * Chat with the Seller Assistant using Gemini (RAG).
     *
     * @param string $message
     * @param array $history
     * @return string
     */
    public function sellerAssistantChat(string $message, array $history = []): string
    {
        if (empty($this->apiKey)) {
            return "Configuration Error: API Key missing.";
        }

        // 1. Embed the user's question
        $questionEmbedding = $this->generateEmbedding($message);

        // 2. Retrieve relevant context from documentation
        // (Assuming we have 'Documentation' model or similar in embeddings table for policies)
        // For simplicity, we search ALL 'Documentation' type embeddings
        $contextText = "";

        if (!empty($questionEmbedding)) {
            $vectorString = '[' . implode(',', $questionEmbedding) . ']';

            $relevantDocs = \Illuminate\Support\Facades\DB::table('embeddings')
                ->where('model_type', 'Documentation') // We will use this string for docs
                ->select('content')
                ->selectRaw("embedding <=> '{$vectorString}' as distance")
                ->orderBy('distance')
                ->limit(3)
                ->get();

            $contextText = $relevantDocs->pluck('content')->join("\n\n");
        }

        // 3. Construct System Prompt with Context
        $systemPrompt = "You are a helpful assistant for a marketplace seller. 
        Use the following CONTEXT from our policy documentation to answer the user's question.
        If the answer is not in the context, say you don't know, but try to be helpful.
        
        CONTEXT:
        {$contextText}
        ";

        // 4. Call Gemini
        $contents = [];
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $systemPrompt . "\n\nUser Question: " . $message]]
        ];

        $response = Http::withoutVerifying()->post("{$this->baseUrl}/models/gemini-1.5-flash:generateContent?key={$this->apiKey}", [
            'contents' => $contents
        ]);

        if ($response->failed()) {
            Log::error('Gemini Chat Error: ' . $response->body());
            return "I'm having trouble connecting to the AI assistant right now.";
        }

        return $response->json('candidates.0.content.parts.0.text') ?? "No response generated.";
    }

    /**
     * Summarize reviews for a product
     * 
     * @param Collection $reviews
     * @return string
     */
    public function summarizeReviews(Collection $reviews): string
    {
        if ($reviews->isEmpty())
            return "No reviews to summarize.";

        $reviewsText = $reviews->pluck('comment')->join("\n");
        // Truncate to avoid context limit if necessary
        $reviewsText = substr($reviewsText, 0, 10000);

        $prompt = "Analyze the following product reviews and generate a concise 3-bullet summary.
        Format:
        • Pros: [Key positives]
        • Cons: [Key negatives]
        • Verdict: [Overall sentiment]
        
        Reviews:
        {$reviewsText}";

        $response = Http::withoutVerifying()->post("{$this->baseUrl}/models/gemini-1.5-flash:generateContent?key={$this->apiKey}", [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [['text' => $prompt]]
                ]
            ]
        ]);

        return $response->json('candidates.0.content.parts.0.text') ?? "Could not generate summary.";
    }

    /**
     * Analyze sentiment of a review using Gemini.
     *
     * @param string $text
     * @return string 'positive', 'neutral', or 'negative'
     */
    public function analyzeSentiment(string $text): string
    {
        if (empty($this->apiKey) || empty(trim($text))) {
            return 'neutral';
        }

        $prompt = "Analyze the sentiment of the following product review and return strictly one of these three words: 'positive', 'neutral', or 'negative'. Do not return any other text or punctuation. Review: \"{$text}\"";

        $response = Http::withoutVerifying()->post("{$this->baseUrl}/models/gemini-1.5-flash:generateContent?key={$this->apiKey}", [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [['text' => $prompt]]
                ]
            ]
        ]);

        if ($response->failed()) {
            return 'neutral';
        }

        $result = $response->json('candidates.0.content.parts.0.text') ?? 'neutral';
        $result = strtolower(trim(preg_replace('/[^A-Za-z]/', '', $result)));

        if (in_array($result, ['positive', 'neutral', 'negative'])) {
            return $result;
        }

        return 'neutral';
    }

    /**
     * Analyze a customer's query to determine if they are asking a general question
     * or searching for a product, and return a conversational response.
     *
     * @param string $query
     * @return array ['response_message' => string, 'is_product_search' => bool, 'search_query' => string|null]
     */
    public function analyzeCustomerQuery(string $query): array
    {
        if (empty($this->apiKey)) {
            return [
                'response_message' => "I'm sorry, my AI backend is currently offline.",
                'is_product_search' => false,
                'search_query' => null
            ];
        }

        $systemPrompt = <<<PROMPT
You are 'Tall-E', a helpful and friendly AI assistant for a modern e-commerce platform called 'Market Place'.

Your job is to analyze the user's input and determine if they are:
1. Asking a general question (e.g., about delivery, returns, policies, greeting).
2. Trying to search for/buy a specific product or category.

If it's a general question, answer it to the best of your ability.
- Delivery: 3-5 business days standard. Free over $150.
- Returns: 30-day hassle-free returns.
If it's a product search, provide a brief friendly confirmation message, and extract the core search terms.

You MUST respond strictly in the following JSON format:
{
    "response_message": "Your conversational reply to the user here.",
    "is_product_search": true/false,
    "search_query": "extracted optimized search terms or null"
}
PROMPT;
        $response = Http::withoutVerifying()->post("{$this->baseUrl}/models/gemini-1.5-flash:generateContent?key={$this->apiKey}", [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $systemPrompt . "\n\nUser Input: " . $query]
                    ]
                ]
            ]
        ]);

        $fallback = [
            'response_message' => "I'm having a little trouble understanding right now, but here are some popular items!",
            'is_product_search' => true,
            'search_query' => $query
        ];

        if ($response->failed()) {
            echo "API FAILED: " . $response->body() . "\n";
            return $fallback;
        }

        $jsonText = $response->json('candidates.0.content.parts.0.text');

        if (empty($jsonText)) {
            return $fallback;
        }

        $result = json_decode($jsonText, true);

        if (json_last_error() === JSON_ERROR_NONE && isset($result['response_message'])) {
            return [
                'response_message' => $result['response_message'],
                'is_product_search' => (bool) ($result['is_product_search'] ?? false),
                'search_query' => $result['search_query'] ?? null,
            ];
        }

        return $fallback;
    }
}
