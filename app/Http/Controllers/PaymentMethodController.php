<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $methods = Auth::user()->paymentMethods()->latest()->get();
        return Inertia::render('Buyer/PaymentMethods', [
            'paymentMethods' => $methods
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'card_number' => ['required', 'string', 'min:15', 'max:19'],
            'expiry' => ['required', 'string', 'regex:/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/'],
            'cvv' => ['required', 'string', 'min:3', 'max:4'],
            'name' => ['required', 'string'],
        ]);

        // Mock brand detection
        $brand = 'Visa';
        if (str_starts_with($request->card_number, '5')) {
            $brand = 'MasterCard';
        } elseif (str_starts_with($request->card_number, '3')) {
            $brand = 'Amex';
        } elseif (str_starts_with($request->card_number, '6')) {
            $brand = 'Discover';
        }

        $last4 = substr(str_replace(' ', '', $request->card_number), -4);

        $expiryParts = explode('/', str_replace(' ', '', $request->expiry));
        $expiryMonth = (int) $expiryParts[0];
        $expiryYear = count($expiryParts) > 1 ? (int) $expiryParts[1] : (int) date('y') + 5;

        // Ensure 4 digit year
        if ($expiryYear < 100) {
            $expiryYear += 2000;
        }

        Auth::user()->paymentMethods()->create([
            'brand' => $brand,
            'last4' => $last4,
            'expiry_month' => $expiryMonth,
            'expiry_year' => $expiryYear,
            'is_default' => Auth::user()->paymentMethods()->count() === 0,
        ]);

        return back()->with('success', 'Payment method added successfully.');
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        if ($paymentMethod->user_id === Auth::id()) {
            $paymentMethod->delete();
        }
        return back()->with('success', 'Payment method removed.');
    }
}
