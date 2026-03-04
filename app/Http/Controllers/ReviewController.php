<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, \App\Services\AIService $aiService)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'images.*' => 'nullable|image|max:2048', // up to 2MB each
        ]);

        // Check if user has already reviewed this product to avoid duplicates (optional, but good practice)
        $existing = Review::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('reviews', 'public');
            }
        }

        // Advanced AI Sentiment Analysis
        $sentiment = $aiService->analyzeSentiment($request->comment);

        // Fallback to rating if AI returns neutral but rating is extreme
        if ($sentiment === 'neutral') {
            if ($request->rating >= 4) {
                $sentiment = 'positive';
            } elseif ($request->rating <= 2) {
                $sentiment = 'negative';
            }
        }

        Review::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'images' => $imagePaths,
            'sentiment' => $sentiment,
        ]);

        return back()->with('success', 'Review submitted successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        // Only admins can delete reviews
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        // Delete associated files
        if ($review->images) {
            foreach ($review->images as $imagePath) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($imagePath);
            }
        }

        $review->delete();

        return back()->with('success', 'Review deleted successfully.');
    }
}
