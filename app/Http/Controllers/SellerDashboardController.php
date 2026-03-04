<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Payout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role !== 'seller') {
            abort(403, 'Unauthorized action.');
        }

        $shop = $user->shop;
        if (!$shop) {
            // Redirect to shop creation or show generic dashboard
            return redirect()->route('seller.register')->with('info', 'Please create your shop first.');
        }

        // Stats
        $totalProducts = Product::where('shop_id', $shop->id)->count();
        $totalEarnings = Order::where('shop_id', $shop->id)
            ->where('status', 'delivered')
            ->sum('seller_earnings');

        $pendingOrders = Order::where('shop_id', $shop->id)
            ->where('status', 'processing')
            ->count();

        $lowStockProducts = Product::where('shop_id', $shop->id)
            ->where('stock', '<', 5)
            ->limit(5)
            ->get();

        $recentOrders = Order::where('shop_id', $shop->id)
            ->with('user')
            ->latest()
            ->limit(5)
            ->get();

        $notifications = \App\Models\Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->latest()
            ->get();

        return \Inertia\Inertia::render('Seller/Dashboard', [
            'shop' => $shop,
            'totalProducts' => $totalProducts,
            'totalEarnings' => $totalEarnings,
            'pendingOrders' => $pendingOrders,
            'lowStockProducts' => $lowStockProducts,
            'recentOrders' => $recentOrders,
            'notifications' => $notifications
        ]);
    }

    public function analysis()
    {
        $user = Auth::user();
        if ($user->role !== 'seller') {
            abort(403, 'Unauthorized action.');
        }

        $shop = $user->shop;
        if (!$shop) {
            return redirect()->route('seller.register')->with('info', 'Please create your shop first.');
        }

        // Fetch all reviews for this seller's products
        $reviews = \App\Models\Review::whereHas('product', function ($query) use ($shop) {
            $query->where('shop_id', $shop->id);
        })->with('product')->get();

        // Calculate Global Sentiments
        $globalSentiments = [
            'positive' => $reviews->where('sentiment', 'positive')->count(),
            'neutral' => $reviews->where('sentiment', 'neutral')->count(),
            'negative' => $reviews->where('sentiment', 'negative')->count(),
        ];

        // Format data for Recharts (Array of Objects)
        $sentimentChartData = [
            ['name' => 'Positive', 'value' => $globalSentiments['positive'], 'color' => '#22c55e'], // green-500
            ['name' => 'Neutral', 'value' => $globalSentiments['neutral'], 'color' => '#94a3b8'], // slate-400
            ['name' => 'Negative', 'value' => $globalSentiments['negative'], 'color' => '#ef4444'], // red-500
        ];

        // Product Breakdown
        $productReviewData = $reviews->groupBy('product_id')->map(function ($productReviews) {
            $product = $productReviews->first()->product;
            return [
                'id' => $product->id,
                'name' => $product->name,
                'total_reviews' => $productReviews->count(),
                'positive' => $productReviews->where('sentiment', 'positive')->count(),
                'neutral' => $productReviews->where('sentiment', 'neutral')->count(),
                'negative' => $productReviews->where('sentiment', 'negative')->count(),
            ];
        })->values();

        // Actionable Insights: Recent Negative Reviews
        $recentNegativeReviews = \App\Models\Review::whereHas('product', function ($query) use ($shop) {
            $query->where('shop_id', $shop->id);
        })->where('sentiment', 'negative')
            ->with(['product', 'user'])
            ->latest()
            ->limit(5)
            ->get();

        return \Inertia\Inertia::render('Seller/Analysis', [
            'sentimentChartData' => $sentimentChartData,
            'productReviewData' => $productReviewData,
            'globalSentiments' => $globalSentiments,
            'recentNegativeReviews' => $recentNegativeReviews,
        ]);
    }
}
