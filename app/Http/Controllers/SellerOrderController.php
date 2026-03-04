<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shop = Auth::user()->shop;
        if (!$shop) {
            return redirect()->route('dashboard')->with('error', 'You need a shop to view orders.');
        }

        // Fetch Sub-Orders assigned to this shop
        $orders = Order::where('shop_id', $shop->id)
            ->with(['user', 'items.product'])
            ->latest()
            ->paginate(10);

        return \Inertia\Inertia::render('Seller/Orders/Index', [
            'orders' => $orders
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $shop = Auth::user()->shop;
        // Ensure seller owns this order
        $order = Order::where('id', $id)
            ->where('shop_id', $shop->id)
            ->with(['user', 'items.product', 'parent'])
            ->firstOrFail();

        return \Inertia\Inertia::render('Seller/Orders/Show', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $shop = Auth::user()->shop;
        $order = Order::where('id', $id)
            ->where('shop_id', $shop->id)
            ->firstOrFail();

        $request->validate([
            'status' => 'required|string|in:pending_payment,processing,shipped,delivered,cancelled',
            'tracking_id' => 'nullable|string|max:255',
        ]);

        $order->update([
            'status' => $request->status,
            'tracking_id' => $request->tracking_id,
        ]);

        return redirect()->back()->with('success', 'Order updated successfully.');
    }
}
