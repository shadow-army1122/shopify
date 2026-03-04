<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$ai = new \App\Services\AIService();

echo "--- SUMMARIZE REVIEWS TEST ---\n";
print_r($ai->summarizeReviews(collect([
    new \App\Models\Review(['comment' => 'Great product!']),
    new \App\Models\Review(['comment' => 'Terrible delivery.'])
])));
