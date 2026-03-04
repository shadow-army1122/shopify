import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import ReviewList from '@/Components/ReviewList';

export default function Show({ product, related, summary, sentimentCounts }) {
    const [selectedImage, setSelectedImage] = useState(product.image_url || `https://placehold.co/600x800/f8f8f8/e5e5e5?text=${encodeURIComponent(product.name)}`);
    const [quantity, setQuantity] = useState(1);

    // Use real product images if available. For now, we just have the single main image URL.
    const gallery = [
        product.image_url || `https://placehold.co/600x800/f8f8f8/e5e5e5?text=${encodeURIComponent(product.name)}`
    ];

    const handleAddToCart = () => {
        router.post(`/cart/add/${product.id}`, { quantity }, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/checkout');
            }
        });
    };

    return (
        <StorefrontLayout>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-icons text-sm mx-1">chevron_right</span>
                                <Link href={`/?category=${product.category?.slug || ''}`} className="hover:text-primary transition-colors">
                                    {product.category?.name || 'Shop'}
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="material-icons text-sm mx-1">chevron_right</span>
                                <span className="text-slate-800 font-medium truncate max-w-[200px]">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Product Gallery */}
                    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 mb-10 lg:mb-0 w-full">
                        {/* Thumbnails - Only show if there's more than one image */}
                        {gallery.length > 1 && (
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:w-24 shrink-0 scrollbar-hide">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative rounded-lg overflow-hidden shrink-0 w-20 h-24 lg:w-full lg:h-32 bg-slate-100 border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-slate-300'}`}
                                    >
                                        {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain object-center mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Main Image */}
                        <div className="flex-1 rounded-2xl overflow-hidden bg-slate-100 glass-panel aspect-[4/5] relative mx-auto w-full max-w-lg">
                            {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                            <img src={selectedImage} alt={product.name} className="w-full h-full object-contain object-center mix-blend-multiply p-4" />
                            <button className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white border border-slate-200 transition-all shadow-sm">
                                <span className="material-icons">favorite_border</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        {/* Vendor & Title */}
                        <div className="mb-6">
                            <Link href={`/seller/${product.shop?.id}`} className="text-primary font-bold tracking-wider uppercase text-sm hover:underline">
                                {product.shop?.name || 'Shopify Direct'}
                            </Link>
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                                        <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                                        <span className="font-bold text-slate-800 text-sm">
                                            {(product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length).toFixed(1)}
                                        </span>
                                        <span className="text-slate-500 text-xs ml-1 hover:underline cursor-pointer" onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' })}>
                                            ({product.reviews.length} reviews)
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                        <span className="material-icons text-slate-400 text-sm mr-1">star_border</span>
                                        <span className="text-slate-500 text-xs font-medium">No reviews yet</span>
                                    </div>
                                )}
                                <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md border border-green-200">In Stock</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8 flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-slate-900">${Number(product.price).toLocaleString()}</span>
                            {product.compare_at_price && (
                                <span className="text-xl text-slate-400 line-through">${Number(product.compare_at_price).toLocaleString()}</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose prose-sm sm:prose-base text-slate-600 mb-8 max-w-none">
                            <p>{product.description || 'Experience premium quality and unparalleled design with this exclusive product. Crafted with attention to detail to meet the highest standards.'}</p>
                        </div>

                        {/* AI Summary Banner */}
                        {summary && (
                            <div className="mb-8 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-4 rounded-r-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-icons text-primary animate-pulse">auto_awesome</span>
                                    <span className="font-bold text-slate-800 text-sm">Tall-E AI Summary</span>
                                </div>
                                <p className="text-sm text-slate-700 italic">"{summary}"</p>
                            </div>
                        )}

                        <hr className="border-slate-200 mb-8" />

                        {/* Variants (Mocked) - Conditionally render based on category */}
                        {['Fashion', 'Men', 'Women', 'Kids', 'Gym', 'Cycling', 'Hiking', 'Apparel', 'Clothing', 'Shoes'].includes(product.category?.name) && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-slate-800">Size</h3>
                                    <button className="text-sm text-slate-500 hover:text-primary transition-colors underline">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <button key={size} className="w-12 h-12 rounded-lg border-2 border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:border-primary hover:text-primary transition-all focus:border-primary focus:text-primary focus:ring-2 focus:ring-primary/20">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between border-2 border-slate-200 rounded-full h-14 px-2 sm:w-1/3 text-lg">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                                    <span className="material-icons text-sm">remove</span>
                                </button>
                                <span className="font-bold text-slate-800">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                                    <span className="material-icons text-sm">add</span>
                                </button>
                            </div>
                            {/* Add Button */}
                            <button onClick={handleAddToCart} className="flex-1 h-14 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20">
                                <span className="material-icons">shopping_bag</span> Add to Cart
                            </button>
                        </div>

                        {/* Features List */}
                        <ul className="text-sm text-slate-600 space-y-3 mb-8">
                            <li className="flex items-center gap-3"><span className="material-icons text-green-500">local_shipping</span> Free shipping on orders over $150</li>
                            <li className="flex items-center gap-3"><span className="material-icons text-green-500">assignment_return</span> 30-day hassle-free returns</li>
                            <li className="flex items-center gap-3"><span className="material-icons text-green-500">verified_user</span> Secure checkout guarantee</li>
                        </ul>
                    </div>
                </div>

                <div id="reviews-section" className="mt-16 pt-16 border-t border-slate-200">
                    <div className="max-w-4xl mx-auto">
                        <ReviewList reviews={product.reviews || []} sentimentCounts={sentimentCounts} />
                    </div>
                </div>

                {/* Related Products Section */}
                {related && related.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading text-3xl font-bold text-slate-900">You Might Also Like</h2>
                            <Link href={`/?category=${product.category?.slug || ''}`} className="text-primary font-medium hover:underline flex items-center gap-1">
                                View Collection <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((relProduct) => (
                                <Link href={`/product/${relProduct.slug}`} key={relProduct.id} className="group glass-panel rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl block">
                                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-4 relative">
                                        {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                        <img
                                            src={relProduct.image_url || `https://placehold.co/600x800/f8f8f8/e5e5e5?text=${encodeURIComponent(relProduct.name)}`}
                                            alt={relProduct.name}
                                            className="w-full h-full object-contain object-center mix-blend-multiply transition-transform duration-500 group-hover:scale-110 p-2"
                                        />
                                    </div>
                                    <p className="text-xs font-semibold text-primary uppercase mb-1">{relProduct.category?.name || 'Related'}</p>
                                    <h3 className="font-heading font-bold text-slate-800 text-lg truncate group-hover:text-primary transition-colors mb-2">
                                        {relProduct.name}
                                    </h3>
                                    <span className="font-bold text-slate-900">${Number(relProduct.price).toLocaleString()}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
