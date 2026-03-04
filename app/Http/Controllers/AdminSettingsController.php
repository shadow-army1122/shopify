<?php

namespace App\Http\Controllers;

use App\Models\GlobalSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminSettingsController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $commission = GlobalSetting::where('key', 'commission_percentage')->value('value') ?? 0;

        return \Inertia\Inertia::render('Admin/Settings/Index', [
            'commission' => $commission
        ]);
    }

    public function update(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'commission_percentage' => 'required|numeric|min:0|max:100',
        ]);

        GlobalSetting::updateOrCreate(
            ['key' => 'commission_percentage'],
            ['value' => $request->commission_percentage]
        );

        return redirect()->back()->with('success', 'Commission settings updated successfully.');
    }
}
