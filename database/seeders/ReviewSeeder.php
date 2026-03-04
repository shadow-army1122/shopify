<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $users = User::all();

        if ($products->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($products as $product) {
            // Add 3-5 reviews per product
            for ($i = 0; $i < rand(3, 5); $i++) {
                Review::create([
                    'user_id' => $users->random()->id,
                    'product_id' => $product->id,
                    'rating' => rand(3, 5),
                    'comment' => $this->getRandomComment(),
                ]);
            }
        }
    }

    private function getRandomComment()
    {
        $comments = [
            "Great product, highly recommended!",
            "Good quality but shipping was slow.",
            "Exceeded my expectations.",
            "Decent value for the price.",
            "Absolutely love it!",
            "The battery life is amazing.",
            "Screen quality is top notch.",
            "A bit heavy but very durable.",
            "Customer service was helpful."
        ];
        return $comments[array_rand($comments)];
    }
}
