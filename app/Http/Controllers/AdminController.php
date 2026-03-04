<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        // KPI: Financials
        // Assuming completed orders are 'delivered'. Adjust status as needed.
        $completedOrders = Order::where('status', 'delivered')->get();
        $totalRevenue = $completedOrders->sum('total_amount');
        $totalCommissions = $completedOrders->sum('admin_commission');

        // KPI: Pending Payouts
        $pendingPayoutsCount = \App\Models\Payout::where('status', 'requested')->count();
        $pendingPayoutsTotal = \App\Models\Payout::where('status', 'requested')->sum('amount');

        // KPI: Active Sellers
        $activeSellersCount = \App\Models\User::where('role', 'seller')->where('is_active', true)->count();

        // Order Summary
        $ordersPendingPayment = Order::where('status', 'pending_payment')->count();
        $ordersProcessing = Order::where('status', 'processing')->count();

        // Verification Alerts
        $pendingShops = Shop::where('is_verified', false)->with('user')->get();
        // Assuming 'payment_proof' column exists or we check payment_method
        // Use manual_payment_orders for now if payment_proof is not yet confirmed
        $manualVerificationOrders = Order::where('payment_method', 'manual_bank_transfer')
            ->where('status', 'pending_payment')
            ->with('user')
            ->get();

        $verificationAlertCount = $pendingShops->count() + $manualVerificationOrders->count();

        $verifiedShops = Shop::where('is_verified', true)->with('user')->limit(5)->get();

        return \Inertia\Inertia::render('Admin/Dashboard', [
            'totalRevenue' => $totalRevenue,
            'totalCommissions' => $totalCommissions,
            'pendingPayoutsCount' => $pendingPayoutsCount,
            'pendingPayoutsTotal' => $pendingPayoutsTotal,
            'activeSellersCount' => $activeSellersCount,
            'ordersPendingPayment' => $ordersPendingPayment,
            'ordersProcessing' => $ordersProcessing,
            'pendingShops' => $pendingShops,
            'manualVerificationOrders' => $manualVerificationOrders,
            'verificationAlertCount' => $verificationAlertCount,
            'verifiedShops' => $verifiedShops,
        ]);
    }

    public function approve($id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $shop = Shop::findOrFail($id);
        $shop->is_verified = true;
        $shop->save();

        // Also activate the user so they can login
        $shop->user->is_active = true;
        $shop->user->save();

        return redirect()->back()->with('success', 'Shop approved successfully.');
    }
}
