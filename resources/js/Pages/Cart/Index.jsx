import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';

export default function Index({ cart, total }) {
    // cart from backend is an object/associative array, convert to array for rendering
    const cartItems = Object.values(cart || {});

    const { processing } = useForm();

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        router.patch(`/cart/update/${id}`, { quantity: newQuantity }, {
            preserveScroll: true,
        });
    };

    const removeItem = (id) => {
        router.get(`/cart/remove/${id}`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <StorefrontLayout>
            <Head title="Your Cart | Shopify" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-24 glass-panel rounded-2xl flex flex-col items-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <span className="material-icons text-5xl text-slate-300">shopping_cart</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
                        <Link href="/" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors inline-block shadow-lg">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Header */}
                                <div className="hidden md:grid grid-cols-6 gap-4 p-6 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <div className="col-span-3">Product</div>
                                    <div className="col-span-1 text-center">Quantity</div>
                                    <div className="col-span-1 text-right">Price</div>
                                    <div className="col-span-1 text-right">Total</div>
                                </div>

                                {/* Items */}
                                <div className="divide-y divide-slate-100">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-6 gap-6 items-center group relative hover:bg-slate-50 transition-colors">
                                            {/* Mobile Delete Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="md:hidden absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm"
                                            >
                                                <span className="material-icons text-sm">close</span>
                                            </button>

                                            <div className="col-span-3 w-full flex items-center gap-6">
                                                <Link href={`/product/${item.slug}`} className="shrink-0 w-24 h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 block">
                                                    {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                                    <img
                                                        src={item.product?.image_url || `https://placehold.co/300x300/f8f8f8/e5e5e5?text=${encodeURIComponent(item.product?.name || 'Item')}`}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-contain object-center mix-blend-multiply group-hover:scale-105 transition-transform p-2"
                                                    />
                                                </Link>
                                                <div>
                                                    <span className="text-xs font-bold text-primary uppercase mb-1 block">{item.shop_name}</span>
                                                    <Link href={`/product/${item.slug}`} className="font-heading font-bold text-lg text-slate-800 hover:text-primary transition-colors">
                                                        {item.name}
                                                    </Link>
                                                    <div className="text-sm text-slate-500 mt-1">Size: M | Color: Black</div>
                                                </div>
                                            </div>

                                            <div className="col-span-1 w-full md:w-auto flex justify-between md:justify-center items-center mt-4 md:mt-0">
                                                <span className="md:hidden text-sm font-semibold text-slate-500">Quantity</span>
                                                <div className="flex items-center justify-between border border-slate-200 rounded-full h-10 w-28 px-1 bg-white">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={processing} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                                                        <span className="material-icons text-xs">remove</span>
                                                    </button>
                                                    <span className="font-bold text-slate-800 text-sm">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={processing} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                                                        <span className="material-icons text-xs">add</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-span-1 hidden md:block text-right">
                                                <span className="text-slate-500 font-medium">${Number(item.price).toLocaleString()}</span>
                                            </div>

                                            <div className="col-span-1 w-full flex justify-between md:justify-end items-center mt-2 md:mt-0">
                                                <span className="md:hidden text-sm font-semibold text-slate-500">Total</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-slate-900">${(Number(item.price) * item.quantity).toLocaleString()}</span>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                        title="Remove from cart"
                                                    >
                                                        <span className="material-icons text-sm">delete_outline</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 items-center">
                                <span className="flex items-center gap-2"><span className="material-icons text-green-500">verified_user</span> Secure SSL Checkout</span>
                                <span className="flex items-center gap-2"><span className="material-icons text-green-500">local_shipping</span> Free Shipping & Returns</span>
                                <span className="flex items-center gap-2"><span className="material-icons text-green-500">support_agent</span> 24/7 AI Support via Tall-E</span>
                            </div>
                        </div>

                        {/* Order Summary Summary Panel */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 sticky top-24 border border-slate-200">
                                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-medium">${Number(total).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Shipping <span className="material-icons text-[10px] ml-1 text-slate-400">help_outline</span></span>
                                        <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Estimated Tax</span>
                                        <span className="font-medium">${(Number(total) * 0.08).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-slate-800">Total</span>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400 block mb-1">USD</span>
                                            <span className="font-heading text-3xl font-bold text-slate-900">
                                                ${(Number(total) * 1.08).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full h-14 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group">
                                    Proceed to Checkout <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>

                                <div className="mt-6 text-center">
                                    <p className="text-xs text-slate-500 mb-2">We accept</p>
                                    <div className="flex justify-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                                        <img src="/assets/paypal.svg" alt="PayPal" className="h-6 object-contain" />
                                        <img src="/assets/mastercard-2019.svg" alt="Mastercard" className="h-6 object-contain" />
                                        <img src="/assets/visa.svg" alt="Visa" className="h-6 object-contain bg-white rounded px-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
