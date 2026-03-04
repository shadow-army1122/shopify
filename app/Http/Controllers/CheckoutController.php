<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = \Illuminate\Support\Facades\Session::get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        $paymentMethods = [];
        if (Auth::check()) {
            $paymentMethods = Auth::user()->paymentMethods()->latest()->get();
        }

        return \Inertia\Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'total' => $total,
            'paymentMethods' => $paymentMethods
        ]);
    }

    public function store(Request $request)
    {
        // Require Login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to checkout.');
        }

        $cart = Session::get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty.');
        }

        try {
            DB::beginTransaction();

            // 1. Calculate Grand Total
            $grandTotal = 0;
            $itemsByShop = [];

            foreach ($cart as $id => $item) {
                $grandTotal += $item['price'] * $item['quantity'];
                $itemsByShop[$item['shop_id']][] = [
                    'product_id' => $id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ];
            }

            // 2. Create Master Order
            $masterOrder = Order::create([
                'user_id' => Auth::id(),
                'parent_id' => null, // Is Master
                'shop_id' => null,   // Master has no specific shop
                'total_amount' => $grandTotal,
                'status' => 'pending_payment',
                'tracking_id' => null
            ]);

            // 3. Create Sub-Orders per Shop
            foreach ($itemsByShop as $shopId => $items) {
                $subTotal = 0;
                foreach ($items as $item) {
                    $subTotal += $item['price'] * $item['quantity'];
                }

                $subOrder = Order::create([
                    'user_id' => Auth::id(),
                    'parent_id' => $masterOrder->id,
                    'shop_id' => $shopId,
                    'total_amount' => $subTotal,
                    'admin_commission' => $subTotal * 0.05, // 5% Commission
                    'seller_earnings' => $subTotal * 0.95,  // 95% Earnings
                    'status' => 'pending_payment',
                    'tracking_id' => null // To be filled by seller
                ]);

                // 4. Create Order Items for Sub-Order
                foreach ($items as $item) {
                    OrderItem::create([
                        'order_id' => $subOrder->id,
                        'product_id' => $item['product_id'],
                        'shop_id' => $shopId,
                        'quantity' => $item['quantity'],
                        'price' => $item['price']
                    ]);

                    // 5. Decrement Stock
                    $product = Product::find($item['product_id']);
                    if ($product) {
                        $product->decrement('stock', $item['quantity']);
                    }
                }
            }

            DB::commit();

            // Clear Cart
            Session::forget('cart');

            return redirect()->route('checkout.success', $masterOrder->id);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Order failed: ' . $e->getMessage());
        }
    }

    public function success($id)
    {
        $order = Order::with('items.product')->where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        return \Inertia\Inertia::render('Checkout/Success', [
            'order' => $order
        ]);
    }
}
