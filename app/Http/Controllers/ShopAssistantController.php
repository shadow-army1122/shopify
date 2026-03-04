<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ShopAssistantController extends Controller
{
    public function enquire(Request $request, \App\Services\AIService $aiService)
    {
        $request->validate([
            'query' => 'required|string|max:500',
        ]);

        $query = $request->input('query');

        // 1. Analyze the intent with Gemini
        $analysis = $aiService->analyzeCustomerQuery($query);

        $message = $analysis['response_message'];
        $products = collect();

        // 2. If it's a product search, find matching products using vector search
        if ($analysis['is_product_search']) {
            $searchQuery = $analysis['search_query'] ?: $query;
            $products = $aiService->searchProducts($searchQuery)->take(3);

            // 3. Fallback if no products matched
            if ($products->isEmpty()) {
                $message = "I couldn't find exactly what you asked for, but here are some of our popular items you might like!";
                $products = Product::where('is_active', true)->inRandomOrder()->limit(3)->get();
            }
        }

        return response()->json([
            'message' => $message,
            'products' => $products
        ]);
    }
}
