<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyerController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Redirect based on role if needed (though middleware handles access, specialized dashboards prefer redirection)
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === 'seller') {
            if (request()->header('X-Inertia')) {
                return \Inertia\Inertia::location(route('seller.dashboard'));
            }
            return redirect()->route('seller.dashboard');
        }

        // Buyer Dashboard Logic
        $recentOrders = Order::where('user_id', $user->id)
            ->whereNull('parent_id') // Show master orders
            ->with(['subOrders.items.product'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($order) {
                // Attach flattened items for frontend
                $order->items = $order->subOrders->flatMap->items->values();

                // Dynamically derive master status and tracking from suborders
                if ($order->subOrders->isNotEmpty()) {
                    $statuses = $order->subOrders->pluck('status')->toArray();
                    $trackingIds = $order->subOrders->pluck('tracking_id')->filter()->unique()->implode(', ');

                    if (in_array('pending_payment', $statuses))
                        $order->status = 'pending_payment';
                    elseif (in_array('processing', $statuses))
                        $order->status = 'processing';
                    elseif (in_array('shipped', $statuses))
                        $order->status = 'shipped';
                    elseif (!array_diff($statuses, ['delivered']))
                        $order->status = 'delivered';
                    elseif (!array_diff($statuses, ['cancelled']))
                        $order->status = 'cancelled';
                    else
                        $order->status = 'processing';

                    if ($trackingIds)
                        $order->tracking_id = $trackingIds;
                    $order->updated_at = $order->subOrders->max('updated_at');
                }

                return $order;
            });

        // Payment Methods
        $paymentMethods = $user->paymentMethods()->latest()->get();

        return \Inertia\Inertia::render('Buyer/Dashboard', [
            'recentOrders' => $recentOrders,
            'paymentMethods' => $paymentMethods
        ]);
    }

    public function orders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->whereNull('parent_id')
            ->with(['subOrders.items.product'])
            ->latest()
            ->paginate(10);

        $orders->getCollection()->transform(function ($order) {
            $order->items = $order->subOrders->flatMap->items->values();

            if ($order->subOrders->isNotEmpty()) {
                $statuses = $order->subOrders->pluck('status')->toArray();
                if (in_array('pending_payment', $statuses))
                    $order->status = 'pending_payment';
                elseif (in_array('processing', $statuses))
                    $order->status = 'processing';
                elseif (in_array('shipped', $statuses))
                    $order->status = 'shipped';
                elseif (!array_diff($statuses, ['delivered']))
                    $order->status = 'delivered';
                elseif (!array_diff($statuses, ['cancelled']))
                    $order->status = 'cancelled';
                else
                    $order->status = 'processing';
            }
            return $order;
        });

        return \Inertia\Inertia::render('Buyer/Orders', [
            'orders' => $orders
        ]);
    }

    public function showOrder($id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->with(['subOrders.items.product', 'subOrders.shop', 'user'])
            ->firstOrFail();

        // Flatten the items from the suborders
        $order->items = $order->subOrders->flatMap->items->values();

        // Calculate dynamic tracking state
        if ($order->subOrders->isNotEmpty()) {
            $statuses = $order->subOrders->pluck('status')->toArray();
            $trackingIds = $order->subOrders->pluck('tracking_id')->filter()->unique()->implode(', ');

            if (in_array('pending_payment', $statuses))
                $order->status = 'pending_payment';
            elseif (in_array('processing', $statuses))
                $order->status = 'processing';
            elseif (in_array('shipped', $statuses))
                $order->status = 'shipped';
            elseif (!array_diff($statuses, ['delivered']))
                $order->status = 'delivered';
            elseif (!array_diff($statuses, ['cancelled']))
                $order->status = 'cancelled';
            else
                $order->status = 'processing';

            if ($trackingIds)
                $order->tracking_id = $trackingIds;
            $order->updated_at = $order->subOrders->max('updated_at');
        }

        return \Inertia\Inertia::render('Buyer/OrderShow', [
            'order' => $order
        ]);
    }
}
