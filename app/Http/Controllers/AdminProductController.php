<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $query = Product::with(['shop', 'category']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $products = $query->latest()->paginate(15);

        return \Inertia\Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function toggleStatus($id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $product = Product::findOrFail($id);
        $product->is_active = !$product->is_active;
        $product->save();

        $status = $product->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Product has been {$status}.");
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048', // Allow optional image upload
        ]);

        $updateData = [
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
        ];

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $rawImage = $product->getRawOriginal('image_url');
            if ($rawImage && !str_starts_with($rawImage, 'http')) {
                $oldPath = str_replace('/storage/', '', $rawImage);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('products', 'public');
            $updateData['image_url'] = '/storage/' . $path;
        }

        $product->update($updateData);

        // Notify the seller
        if ($product->shop && $product->shop->user_id) {
            \App\Models\Notification::create([
                'user_id' => $product->shop->user_id,
                'title' => 'Product Updated by Admin',
                'message' => "The admin has updated your product: {$product->name}. Please review the changes.",
                'type' => 'admin_action',
                'action_url' => "/seller/products",
            ]);
        }

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $product = Product::findOrFail($id);
        $shopUserId = $product->shop ? $product->shop->user_id : null;
        $productName = $product->name;

        $product->delete();

        // Notify the seller
        if ($shopUserId) {
            \App\Models\Notification::create([
                'user_id' => $shopUserId,
                'title' => 'Product Deleted by Admin',
                'message' => "The admin has deleted your product: {$productName} from the marketplace.",
                'type' => 'admin_action',
            ]);
        }

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
