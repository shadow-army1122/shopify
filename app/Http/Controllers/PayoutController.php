<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PayoutController extends Controller
{
    /**
     * Display a listing of earnings and payouts.
     */
    public function index()
    {
        $shop = Auth::user()->shop;
        if (!$shop) {
            return redirect()->route('dashboard')->with('error', 'You must have a shop.');
        }

        // Calculate Total Earnings (Completed Orders only)
        // Assuming 'delivered' means funds are ready, or maybe just 'paid' is enough. 
        // For now, let's use 'processing' or 'delivered' as "earnable" statuses to be safe.
        $earnableOrders = Order::where('shop_id', $shop->id)
            ->whereIn('status', ['processing', 'shipped', 'delivered'])
            ->get();

        $totalEarnings = $earnableOrders->sum('seller_earnings');

        $payouts = Payout::where('shop_id', $shop->id)->latest()->get();
        $totalWithdrawn = $payouts->where('status', 'paid')->sum('amount');
        $pendingWithdrawal = $payouts->where('status', 'requested')->sum('amount');

        $availableBalance = $totalEarnings - $totalWithdrawn - $pendingWithdrawal;

        return \Inertia\Inertia::render('Seller/Payouts/Index', [
            'totalEarnings' => $totalEarnings,
            'totalWithdrawn' => $totalWithdrawn,
            'pendingWithdrawal' => $pendingWithdrawal,
            'availableBalance' => $availableBalance,
            'payouts' => $payouts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10',
        ]);

        $shop = Auth::user()->shop;

        // Re-calculate balance to prevent exploitation
        $earnableOrders = Order::where('shop_id', $shop->id)
            ->whereIn('status', ['processing', 'shipped', 'delivered'])
            ->get();
        $totalEarnings = $earnableOrders->sum('seller_earnings');
        $payouts = Payout::where('shop_id', $shop->id)->get();
        $totalWithdrawn = $payouts->whereIn('status', ['paid', 'requested'])->sum('amount'); // Include requested in reserved

        $availableBalance = $totalEarnings - $totalWithdrawn;

        if ($request->amount > $availableBalance) {
            return redirect()->back()->with('error', 'Insufficient balance.');
        }

        Payout::create([
            'shop_id' => $shop->id,
            'amount' => $request->amount,
            'status' => 'requested',
        ]);

        return redirect()->back()->with('success', 'Payout requested successfully.');
    }
}
