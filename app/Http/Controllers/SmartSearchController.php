<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AIService;
use App\Models\Product;

class SmartSearchController extends Controller
{
    protected $ai;

    public function __construct(AIService $ai)
    {
        $this->ai = $ai;
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json([]);
        }

        // Use AI Service to search
        // Note: For now, this might fallback to keyword search if vectors aren't ready
        $results = $this->ai->searchProducts($query);

        return response()->json($results);
    }
}
