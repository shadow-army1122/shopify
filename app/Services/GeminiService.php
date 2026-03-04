<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }

    public function generateEmbedding($text)
    {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key={$this->apiKey}";

        $response = Http::withHeaders(['Content-Type' => 'application/json'])
            ->post($url, [
                'model' => 'models/embedding-001',
                'content' => [
                    'parts' => [['text' => $text]]
                ]
            ]);

        if ($response->successful()) {
            return $response->json()['embedding']['values'];
        }

        throw new \Exception('Failed to generate embedding: ' . $response->body());
    }

    public function recommend($query)
    {
        // 1. Fetch relevant products from DB
        // We fetch all key details to pass to Gemini as context.
        $products = Product::select('id', 'name', 'price', 'description', 'image_url')->get();

        // Prepare CSV-like context to save tokens (JSON is verbose)
        $contextItems = $products->map(function ($p) {
            return "ID:{$p->id} | Name:{$p->name} | Desc:{$p->description} | Price:\${$p->price}";
        })->join("\n");

        $prompt = "You are Tall-E, a friendly shop assistant.
        User Query: '{$query}'
        
        Product Catalog:
        {$contextItems}
        
        Instructions:
        1. Select ONLY products from the catalog that match the user's intent.
        2. If vague (e.g., 'shoes'), show popular ones.
        3. OUTPUT FORMAT: STRICT JSON only. No markdown.
        {
           \"message\": \"<friendly greeting and short explanation>\",
           \"product_ids\": [id1, id2, ...]
        }";

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post("{$this->baseUrl}?key={$this->apiKey}", [
                        'contents' => [
                            [
                                'parts' => [
                                    ['text' => $prompt]
                                ]
                            ]
                        ]
                    ]);

            if ($response->successful()) {
                $data = $response->json();
                $rawText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

                // Clean markdown code blocks if Gemini sends them
                $jsonStr = str_replace(['```json', '```'], '', $rawText);
                $result = json_decode($jsonStr, true);

                return $result ?? [
                    'message' => "I'm having trouble analyzing that right now.",
                    'product_ids' => []
                ];
            } else {
                Log::error('Gemini API Error: ' . $response->body());
                return [
                    'message' => "I'm currently unreachable. Please browse the shop manually!",
                    'product_ids' => []
                ];
            }
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return [
                'message' => "My connection is a bit spotty. I couldn't reach the product database.",
                'product_ids' => []
            ];
        }
    }
}
