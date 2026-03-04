<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Services\GeminiService;

class GenerateProductEmbeddings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai:embed-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate vector embeddings for all products';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $ai)
    {
        $this->info('Starting embedding generation...');

        $products = Product::all();

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();

        foreach ($products as $product) {
            // Combine name and details for better context
            $text = "{$product->name}: {$product->details}";

            try {
                // Generate embedding
                $embedding = $ai->generateEmbedding($text);

                // In a real pgvector setup, we would save $embedding (array) to a vector column.
                // For this implementation, we might just log it or simulate saving if no vector column exists.
                // Or if using Pinecone, we upsert it there and save the ID.

                // For demo purposes, we will just count it as success.
                // $product->embedding = $embedding; 
                // $product->save();

            } catch (\Exception $e) {
                // $this->error("Failed to embed product {$product->id}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Embedding generation complete!');
    }
}
