<?php

namespace App\Http\Controllers;

use App\Models\Payout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminPayoutController extends Controller
{
    public function index(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $query = Payout::with(['shop.user'])->where('status', 'requested');

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('shop', function ($q) use ($search) {
                $q->where('shop_name', 'like', "%{$search}%");
            });
        }

        $payouts = $query->latest()->paginate(15);

        return \Inertia\Inertia::render('Admin/Payouts/Index', [
            'payouts' => $payouts,
            'filters' => request()->all('search')
        ]);
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $payout = Payout::findOrFail($id);

        $request->validate([
            'status' => 'required|in:paid,rejected',
        ]);

        $payout->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Payout status updated.');
    }
}
