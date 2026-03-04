<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategorySearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('q', '');

        $categories = Category::where('name', 'like', "%{$query}%")
            ->with('parent') // Load parent if it's a subcategory
            ->limit(20)
            ->get()
            ->map(function ($category) {
                // If it's a child category, prepend the parent name for clarity
                $displayName = $category->parent
                    ? $category->parent->name . ' > ' . $category->name
                    : $category->name;

                return [
                    'id' => $category->id,
                    'name' => $displayName,
                    'original_name' => $category->name
                ];
            });

        return response()->json($categories);
    }
}
