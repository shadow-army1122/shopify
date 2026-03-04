<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Shop;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Sellers and Shops
        $this->createSellerWithShop('Tech World', 'tech@seller.com', 'Electronics', true);
        $this->createSellerWithShop('Fashion Avenue', 'fashion@seller.com', 'Fashion', true);
        $this->createSellerWithShop('Green Earth', 'green@seller.com', 'Home & Living', false); // Unverified

        // 2. Create Buyers
        User::firstOrCreate(
            ['email' => 'buyer@demo.com'],
            [
                'name' => 'John Buyer',
                'password' => Hash::make('password'),
                'role' => 'buyer',
                'is_active' => true,
            ]
        );

        $this->command->info('Demo Data Seeded: Sellers, Shops, and Buyers created.');
    }

    private function createSellerWithShop($name, $email, $categorySlug, $isVerified)
    {
        // Create User
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name . ' Owner',
                'password' => Hash::make('password'),
                'role' => 'seller',
                'is_active' => $isVerified, // Active only if shop is approved (simplified logic)
            ]
        );

        // Create Shop
        $shop = Shop::firstOrCreate(
            ['user_id' => $user->id],
            [
                'shop_name' => $name,
                'slug' => Str::slug($name),
                'is_verified' => $isVerified,
            ]
        );

        // Add Products if Verified
        if ($isVerified) {
            $this->addProductsToShop($shop, $categorySlug);
        }
    }

    private function addProductsToShop($shop, $rootCategoryName)
    {
        // Find subcategories for better realism
        $parentCategory = Category::where('name', $rootCategoryName)->first();
        $subCategories = $parentCategory ? $parentCategory->children : collect();

        $products = [];

        if ($rootCategoryName === 'Electronics') {
            $products = [
                ['name' => 'Ultra Slim Laptop', 'price' => 1200, 'image_url' => '/assets/demo-laptop.jpg', 'details' => 'High performance laptop with extensive battery life for professionals 2024 model.'],
                ['name' => 'Noise Cancelling Headphones', 'price' => 250, 'image_url' => '/assets/demo-headphones.jpg', 'details' => 'Immersive sound experience with active noise cancellation and 30-hour battery.'],
                ['name' => '4K Action Camera', 'price' => 399, 'image_url' => '/assets/demo-camera.jpg', 'details' => 'Capture life in stunning 4K resolution. Waterproof and durable for all adventures.'],
                ['name' => 'Smart Home Hub', 'price' => 129, 'image_url' => '/assets/demo-hub.jpg', 'details' => 'Control your entire home with this voice-activated smart hub. Compatible with all major devices.'],
            ];
        } elseif ($rootCategoryName === 'Fashion') {
            $products = [
                ['name' => 'Classic Denim Jacket', 'price' => 89, 'image_url' => '/assets/demo-jacket.jpg', 'details' => 'Timeless style with durable denim fabric. Perfect for casual outings.'],
                ['name' => 'Running Sneakers', 'price' => 110, 'image_url' => '/assets/demo-sneakers.jpg', 'details' => 'Lightweight and comfortable running shoes with breathable mesh and superior cushioning.'],
                ['name' => 'Leather Satchel bag', 'price' => 150, 'image_url' => '/assets/demo-satchel.jpg', 'details' => 'Premium leather bag with spacious compartments for work and travel.'],
                ['name' => 'Silk Scarf', 'price' => 45, 'image_url' => '/assets/demo-scarf.jpg', 'details' => 'Elegant silk scarf with floral patterns. Soft to the touch and adds a pop of color.'],
            ];
        }

        foreach ($products as $p) {
            Product::updateOrCreate(
                ['slug' => Str::slug($p['name'])], // Search by slug
                [
                    'shop_id' => $shop->id,
                    'category_id' => $subCategories->isNotEmpty() ? $subCategories->random()->id : $parentCategory->id,
                    'name' => $p['name'],
                    'price' => $p['price'],
                    'image_url' => $p['image_url'] ?? null,
                    'stock' => rand(10, 50),
                    'details' => $p['details'],
                    'is_active' => true,
                ]
            );
        }
    }
}
