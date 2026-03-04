<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Services\AIService;
use Illuminate\Support\Facades\DB;

class EmbedProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'embed:products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate vector embeddings for all products';

    /**
     * Execute the console command.
     */
    public function handle(AIService $aiService)
    {
        $products = Product::all();
        $this->info("Found {$products->count()} products to embed.");

        $bar = $this->output->createProgressBar($products->count());
        $bar->start();

        foreach ($products as $product) {
            $textToEmbed = "Name: {$product->name}\nDescription: {$product->details}\nCategory: " . ($product->category->name ?? 'None');

            $embedding = $aiService->generateEmbedding($textToEmbed);

            if (!empty($embedding)) {
                // Save to embeddings table
                // Uses a raw insert/update to ensure we handle the 'vector' type correctly if needed
                // But Laravel's DB::table should handle it if we pass the array as a string literal for pgvector

                $vectorString = '[' . implode(',', $embedding) . ']';

                DB::table('embeddings')->updateOrInsert(
                    [
                        'model_id' => $product->id,
                        'model_type' => Product::class
                    ],
                    [
                        'content' => $textToEmbed,
                        'embedding' => $vectorString,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('All products embedded successfully!');
    }
}
