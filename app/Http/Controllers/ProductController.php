<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Auth::user()->shop->products()->with('category')->latest()->paginate(10);
        return \Inertia\Inertia::render('Seller/Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::whereNull('parent_id')->with('children')->get();
        return \Inertia\Inertia::render('Seller/Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'details' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // 2MB max
        ]);

        $shop = Auth::user()->shop;

        if (!$shop) {
            return redirect()->route('dashboard')->with('error', 'You must have a shop to create products.');
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        Product::create([
            'shop_id' => $shop->id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . Str::random(6),
            'price' => $request->price,
            'stock' => $request->stock,
            'details' => $request->details,
            'image_url' => $imagePath,
            'is_active' => true,
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        if ($product->shop_id !== Auth::user()->shop->id) {
            abort(403);
        }
        $categories = Category::whereNull('parent_id')->with('children')->get();
        return \Inertia\Inertia::render('Seller/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($product->shop_id !== Auth::user()->shop->id) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'details' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048', // 2MB max
        ]);

        $data = [
            'category_id' => $request->category_id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'details' => $request->details,
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('image')) {
            $rawImage = $product->getRawOriginal('image_url');
            if ($rawImage) {
                $path = str_replace('/storage/', '', $rawImage);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
            $data['image_url'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->shop_id !== Auth::user()->shop->id) {
            abort(403);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
