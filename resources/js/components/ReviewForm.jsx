import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function ReviewForm({ productId }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        product_id: productId,
        rating: 0,
        comment: '',
        images: [],
    });

    const [hoveredRating, setHoveredRating] = useState(0);
    const [previewImages, setPreviewImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    // Only allow logged in users to leave a review
    if (!auth?.user) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                <p className="text-slate-600 mb-4">You must be logged in to leave a review.</p>
                <a href="/login" className="btn-primary py-2 px-6 rounded-lg inline-block">Log In</a>
            </div>
        );
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        // Add new files to the existing array of images
        const currentImages = data.images || [];
        const combinedFiles = [...currentImages, ...files].slice(0, 5); // Limit to 5 images max

        setData('images', combinedFiles);

        // Generate previews
        const newPreviews = combinedFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviews);
    };

    const removeImage = (indexToRemove) => {
        const filteredImages = data.images.filter((_, idx) => idx !== indexToRemove);
        setData('images', filteredImages);

        // Revoke and re-generate previews
        const newPreviews = filteredImages.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviews);
    };

    const submit = (e) => {
        e.preventDefault();
        setSuccessMessage(null);
        clearErrors();

        // Manual validation if missing rating
        if (data.rating === 0) {
            setData('errors', { ...errors, rating: 'Please select a star rating.' });
            return;
        }

        post(route('reviews.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset('rating', 'comment', 'images');
                setPreviewImages([]);
                setHoveredRating(0);
                setSuccessMessage('Thank you for your review!');
                setTimeout(() => setSuccessMessage(null), 5000);
            }
        });
    };

    return (
        <form onSubmit={submit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200" encType="multipart/form-data">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-6">Leave a Review</h3>

            {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-2 font-medium">
                    <span className="material-icons text-emerald-500">check_circle</span>
                    {successMessage}
                </div>
            )}

            <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Overall Rating <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-1" onMouseLeave={() => setHoveredRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => setData('rating', star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            className="group focus:outline-none transition-transform hover:scale-110"
                        >
                            <span className={`material-icons text-3xl transition-colors ${star <= (hoveredRating || data.rating) ? 'text-yellow-400' : 'text-slate-200 group-hover:text-yellow-200'
                                }`}>
                                {star <= (hoveredRating || data.rating) ? 'star' : 'star_border'}
                            </span>
                        </button>
                    ))}
                </div>
                {errors.rating && <p className="text-sm text-red-500 mt-2 font-medium">{errors.rating}</p>}
                {(data.errors?.rating) && <p className="text-sm text-red-500 mt-2 font-medium">{data.errors.rating}</p>}
            </div>

            <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-bold text-slate-700 mb-2">Write your review <span className="text-red-500">*</span></label>
                <textarea
                    id="comment"
                    rows="4"
                    className="w-full rounded-xl border-slate-200 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow bg-slate-50 focus:bg-white resize-none"
                    placeholder="What did you like or dislike? What should other shoppers know before buying?"
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    required
                ></textarea>
                {errors.comment && <p className="text-sm text-red-500 mt-2 font-medium">{errors.comment}</p>}
            </div>

            <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-2">Add photos (optional)</label>
                <div className="flex flex-wrap gap-4 mt-2">
                    {previewImages.map((src, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden group shadow-sm">
                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="material-icons text-white">delete</span>
                            </button>
                        </div>
                    ))}

                    {previewImages.length < 5 && (
                        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-colors relative flex items-center justify-center cursor-pointer group">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                title="Click to upload images"
                            />
                            <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <span className="material-icons mb-1">add_photo_alternate</span>
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-500 mt-3">Upload up to 5 images. JPG, PNG. Max 2MB each.</p>
                {/* Dynamically display any image validation errors */}
                {Object.keys(errors).filter(key => key.startsWith('images')).map(key => (
                    <p key={key} className="text-sm text-red-500 mt-2 font-medium">{errors[key]}</p>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {processing ? (
                        <>
                            <span className="material-icons animate-spin text-sm">refresh</span> Submitting...
                        </>
                    ) : (
                        'Submit Review'
                    )}
                </button>
            </div>
        </form>
    );
}
