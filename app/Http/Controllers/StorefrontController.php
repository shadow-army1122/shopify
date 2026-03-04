<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StorefrontController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, \App\Services\AIService $aiService)
    {
        if ($request->has('search') && !empty($request->search)) {
            // Use Smart Semantic Search
            $products = $aiService->searchProducts($request->search);
            // Paginate the collection manually since searchProducts returns a Collection
            $products = new \Illuminate\Pagination\LengthAwarePaginator(
                $products->forPage($request->page ?? 1, 12),
                $products->count(),
                12,
                $request->page ?? 1,
                ['path' => $request->url(), 'query' => $request->query()]
            );
        } else {
            // Standard browsing logic
            $query = Product::where('is_active', true);

            if ($request->has('category')) {
                $category = Category::where('slug', $request->category)->first();
                if ($category) {
                    // Include products from children categories
                    $categoryIds = $category->children->pluck('id')->push($category->id);
                    $query->whereIn('category_id', $categoryIds);
                }
            }

            $products = $query->with('category')->latest()->paginate(12);
        }

        $categories = Category::whereNull('parent_id')->with('children')->get();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug, \App\Services\AIService $aiService)
    {
        $product = Product::where('slug', $slug)->where('is_active', true)->with(['shop', 'category', 'reviews.user'])->firstOrFail();

        // Simple "Buy Box" Logic: Find other products with same group_id or name
        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        // AI Summary of Reviews
        $summary = null;
        if ($product->reviews->isNotEmpty()) {
            // We cache the summary to avoid hitting API on every page load
            // For demo, we might skip cache or use simple cache
            $summary = \Illuminate\Support\Facades\Cache::remember("product_summary_{$product->id}", 3600, function () use ($aiService, $product) {
                return $aiService->summarizeReviews($product->reviews);
            });
        }

        // Review Sentiment Counts
        $sentimentCounts = [
            'positive' => $product->reviews->where('sentiment', 'positive')->count(),
            'neutral' => $product->reviews->where('sentiment', 'neutral')->count(),
            'negative' => $product->reviews->where('sentiment', 'negative')->count(),
        ];

        return Inertia::render('Shop/Show', [
            'product' => $product,
            'related' => $related,
            'summary' => $summary,
            'sentimentCounts' => $sentimentCounts
        ]);
    }

    /**
     * Display a specific seller's storefront.
     */
    public function seller(string $shopId)
    {
        $shop = \App\Models\Shop::findOrFail($shopId);

        $products = Product::where('shop_id', $shop->id)
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->paginate(12);

        return Inertia::render('Shop/Seller', [
            'shop' => $shop,
            'products' => $products,
        ]);
    }
}
