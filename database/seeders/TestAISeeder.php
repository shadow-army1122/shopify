<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\Product;
use App\Models\User;

class TestAISeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            $this->command->error('No user found!');
            return;
        }

        $shop = Shop::firstOrCreate(
            ['user_id' => $user->id],
            ['shop_name' => 'AI Test Shop', 'is_verified' => true, 'slug' => 'ai-test-shop']
        );

        Product::create([
            'shop_id' => $shop->id,
            'name' => 'Gemini AI Sneaker',
            'slug' => 'gemini-ai-sneaker-' . time(),
            'price' => 199.99,
            'stock' => 50,
            'details' => 'A futuristic sneaker designed by AI, embedded with Google Gemini technology.',
        ]);

        $this->command->info('Test Product Created for AI Embedding.');
    }
}
