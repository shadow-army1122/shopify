<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\AIService;
use Illuminate\Support\Facades\DB;

class IngestDocumentation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ingest:docs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ingest documentation for AI context';

    /**
     * Execute the console command.
     */
    public function handle(AIService $aiService)
    {
        $filePath = resource_path('docs/policies.txt');
        if (!file_exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return;
        }

        $content = file_get_contents($filePath);
        // Split by double newlines to get paragraphs/sections
        $chunks = preg_split('/\n\s*\n/', $content);

        $this->info("Found " . count($chunks) . " policy sections to ingest.");
        $bar = $this->output->createProgressBar(count($chunks));

        // Clear old documentation embeddings to avoid duplicates
        DB::table('embeddings')->where('model_type', 'Documentation')->delete();

        foreach ($chunks as $index => $chunk) {
            $chunk = trim($chunk);
            if (empty($chunk))
                continue;

            $embedding = $aiService->generateEmbedding($chunk);

            if (!empty($embedding)) {
                $vectorString = '[' . implode(',', $embedding) . ']';

                DB::table('embeddings')->insert([
                    'model_id' => $index + 1, // Artificial ID
                    'model_type' => 'Documentation', // specific tag for docs
                    'content' => $chunk,
                    'embedding' => $vectorString,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Documentation ingested successfully!');
    }
}
