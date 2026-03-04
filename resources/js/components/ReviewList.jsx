import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function ReviewList({ reviews = [], sentimentCounts = null }) {
    const { auth } = usePage().props;
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (reviewId) => {
        if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
            setDeletingId(reviewId);
            router.delete(route('admin.reviews.destroy', reviewId), {
                preserveScroll: true,
                onFinish: () => setDeletingId(null),
            });
        }
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                    <span className="material-icons text-3xl text-slate-300">rate_review</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">No reviews yet</h3>
                <p className="text-slate-500 text-sm">Be the first to share your thoughts on this product!</p>
            </div>
        );
    }

    // Helper to render stars
    const renderStars = (rating) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`material-icons text-sm ${star <= rating ? 'text-yellow-400' : 'text-slate-200'}`}>
                        {star <= rating ? 'star' : 'star_border'}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                Customer Reviews
                <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">{reviews.length}</span>
            </h3>

            {sentimentCounts && (
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                        <span className="material-icons text-green-500 text-sm">thumb_up</span>
                        <span className="font-bold text-slate-800 text-sm">{sentimentCounts.positive || 0}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Positive</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                        <span className="material-icons text-slate-400 text-sm">remove</span>
                        <span className="font-bold text-slate-800 text-sm">{sentimentCounts.neutral || 0}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Neutral</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                        <span className="material-icons text-red-500 text-sm">thumb_down</span>
                        <span className="font-bold text-slate-800 text-sm">{sentimentCounts.negative || 0}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Negative</span>
                    </div>
                </div>
            )}

            <div className="grid gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 transition-all hover:shadow-md group relative">
                        {/* Admin Delete Button */}
                        {auth?.user?.role === 'admin' && (
                            <button
                                onClick={() => handleDelete(review.id)}
                                disabled={deletingId === review.id}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                                title="Delete this review (Admin)"
                            >
                                <span className={`material-icons text-sm ${deletingId === review.id ? 'animate-spin' : ''}`}>
                                    {deletingId === review.id ? 'refresh' : 'delete'}
                                </span>
                            </button>
                        )}

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0 overflow-hidden">
                                {review.user?.avatar ? (
                                    <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    (review.user?.name || '?').charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{review.user?.name || 'Verified Customer'}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    {renderStars(review.rating)}
                                    <span className="text-xs text-slate-400 font-medium">{new Date(review.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-4">
                            {review.comment}
                        </p>

                        {review.images && Array.isArray(review.images) && review.images.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {review.images.map((img, idx) => (
                                    <a key={idx} href={`/storage/${img}`} target="_blank" rel="noopener noreferrer" className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in group/img">
                                        <img src={`/storage/${img}`} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-icons text-white">zoom_in</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
