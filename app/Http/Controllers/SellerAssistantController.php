<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Product;

class SellerAssistantController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Seller/Assistant');
    }

    public function chat(Request $request)
    {
        $message = strtolower($request->input('message', ''));

        if (!$message) {
            return response()->json(['error' => 'Message required'], 400);
        }

        $shop = Auth::user()->shop;

        if (!$shop) {
            return response()->json(['reply' => 'You do not have an active shop.']);
        }

        $reply = $this->generateDbResponse($message, $shop->id);

        return response()->json(['reply' => $reply]);
    }

    private function generateDbResponse(string $message, int $shopId): string
    {
        // Intent: Earnings / Revenue
        if (str_contains($message, 'earn') || str_contains($message, 'revenue') || str_contains($message, 'sales')) {
            $completedOrders = Order::whereHas('items.product', function ($q) use ($shopId) {
                $q->where('shop_id', $shopId);
            })->where('status', 'delivered')->get();

            $totalRevenue = $completedOrders->sum('total_amount');
            return "Based on your completed orders, your total earnings are **$" . number_format($totalRevenue, 2) . "**.";
        }

        // Intent: Orders / Pending
        if (str_contains($message, 'order') || str_contains($message, 'pending')) {
            $pendingOrdersCount = Order::whereHas('items.product', function ($q) use ($shopId) {
                $q->where('shop_id', $shopId);
            })->where('status', 'processing')->count();

            if ($pendingOrdersCount > 0) {
                return "You currently have **{$pendingOrdersCount}** processing order(s) that need your attention.";
            } else {
                return "Great news! You have no pending orders at the moment.";
            }
        }

        // Intent: Stock / Inventory
        if (str_contains($message, 'stock') || str_contains($message, 'inventory') || str_contains($message, 'low')) {
            $lowStockProducts = Product::where('shop_id', $shopId)
                ->where('stock', '<=', 5)
                ->get();

            if ($lowStockProducts->count() > 0) {
                $productList = $lowStockProducts->map(function ($p) {
                    return "• {$p->name} ({$p->stock} left)";
                })->join("\n");
                return "You have **{$lowStockProducts->count()}** products running low on stock:\n\n{$productList}";
            } else {
                return "All your products are currently well-stocked. Great job maintaining inventory!";
            }
        }

        // Intent: Products summary
        if (str_contains($message, 'product')) {
            $productCount = Product::where('shop_id', $shopId)->count();
            $activeCount = Product::where('shop_id', $shopId)->where('is_active', true)->count();
            return "You currently have **{$productCount}** products in your inventory, with **{$activeCount}** actively listed on the store.";
        }

        // Fallback
        return "I'm Tall-E, your shop assistant! I can give you quick stats directly from your shop's database without needing external API keys. Try asking me about:\n\n• My **earnings** or **sales**\n• My **pending orders**\n• Products with **low stock**\n• My total **products**";
    }
}
