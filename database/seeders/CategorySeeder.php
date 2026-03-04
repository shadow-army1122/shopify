<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Electronics' => ['Smartphones', 'Laptops', 'Cameras', 'Audio'],
            'Fashion' => ['Men', 'Women', 'Kids', 'Accessories'],
            'Home & Living' => ['Furniture', 'Decor', 'Kitchen', 'Bedding'],
            'Beauty & Health' => ['Makeup', 'Skincare', 'Haircare'],
            'Sports & Outdoors' => ['Gym', 'Cycling', 'Hiking'],
        ];

        foreach ($categories as $parentName => $children) {
            $parent = Category::firstOrCreate(
                ['slug' => Str::slug($parentName)],
                [
                    'name' => $parentName,
                    'description' => $parentName . ' main category',
                ]
            );

            foreach ($children as $childName) {
                Category::firstOrCreate(
                    ['slug' => Str::slug($childName)],
                    [
                        'parent_id' => $parent->id,
                        'name' => $childName,
                        'description' => $childName . ' products',
                    ]
                );
            }
        }
    }
}
