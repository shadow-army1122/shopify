import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ReviewForm from '@/Components/ReviewForm';
import OrderTrackingTimeline from '@/Components/OrderTrackingTimeline';

export default function OrderShow({ order }) {
    const [reviewingItemId, setReviewingItemId] = useState(null);

    if (!order) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-display flex flex-col">
            <Head title={`Order #${order.id} | Shopify`} />

            {/* Simple Top Nav */}
            <div className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <Link href="/my-orders" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
                    <span className="material-icons text-sm">arrow_back</span> Back to Orders
                </Link>
                <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-inner hover:scale-105 transition-transform">
                    <span className="font-heading font-bold text-xl">S</span>
                </Link>
                <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-50">
                    <span className="material-icons text-xl">person</span>
                </Link>
            </div>

            <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-up">
                    <div>
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                            Order #{order.id}
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 font-bold text-xs uppercase tracking-wider rounded-full border border-amber-100 font-sans">
                                {order.status.replace('_', ' ')}
                            </span>
                        </h1>
                        <p className="text-slate-500">Placed on {new Date(order.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-3">
                        <a href={`/my-orders/${order.id}/invoice`} target="_blank" className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                            <span className="material-icons text-sm">receipt_long</span> Download Invoice
                        </a>
                        <Link href="/contact" className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2">
                            <span className="material-icons text-sm">support_agent</span> Need Help?
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Items */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-slate-100">
                                <h2 className="font-heading text-xl font-bold text-slate-900">Items Ordered</h2>
                            </div>
                            <div className="p-6 md:p-8 space-y-6">
                                {order.items && order.items.map(item => (
                                    <div key={item.id} className="flex gap-6 items-start pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                        <Link href={`/product/${item.product?.slug || '#'}`} className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0 relative group">
                                            {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                            <img src={item.product?.image_url || `https://placehold.co/200x200/f8f8f8/e5e5e5?text=${encodeURIComponent(item.product?.name || 'Item')}`} alt={item.product?.name} className="w-full h-full object-contain object-center mix-blend-multiply transition-transform group-hover:scale-110 p-2" />
                                        </Link>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <Link href={`/product/${item.product?.slug || '#'}`} className="font-bold text-slate-900 hover:text-primary transition-colors text-lg">
                                                        {item.product?.name || 'Unknown Product'}
                                                    </Link>
                                                    <p className="text-sm text-slate-500 mt-1">{item.subOrder?.shop?.shop_name || 'Shopify Direct'}</p>
                                                </div>
                                                <span className="font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm justify-between sm:items-center">
                                                <div className="flex gap-4">
                                                    <span className="text-slate-600 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">Qty: <strong>{item.quantity}</strong></span>
                                                    <span className="text-slate-600 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">Price: <strong>${Number(item.price).toLocaleString()}</strong></span>
                                                </div>
                                                {order.status === 'delivered' && (
                                                    <button
                                                        onClick={() => setReviewingItemId(reviewingItemId === item.id ? null : item.id)}
                                                        className="text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                                                    >
                                                        <span className="material-icons text-sm">{reviewingItemId === item.id ? 'close' : 'rate_review'}</span>
                                                        {reviewingItemId === item.id ? 'Cancel Review' : 'Write a Review'}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Review Form Area */}
                                            {reviewingItemId === item.id && item.product && (
                                                <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in">
                                                    <ReviewForm productId={item.product.id} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Timeline (Mock tracking) */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-icons text-primary">local_shipping</span> Delivery Tracking
                                </h2>
                                {order.tracking_id && (
                                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">TRK: {order.tracking_id}</span>
                                )}
                            </div>
                            <div className="p-6 md:p-8">
                                <OrderTrackingTimeline
                                    status={order.status}
                                    createdAt={order.created_at}
                                    updatedAt={order.updated_at}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Payment Summary</h2>
                            <div className="space-y-4 mb-6 border-b border-slate-200 pb-6 text-sm">
                                <div className="flex justify-between items-center text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${Number(order.total_amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600">
                                    <span>Tax</span>
                                    <span className="font-medium">${(Number(order.total_amount) * 0.08).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-slate-800 text-lg">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500 mr-1">USD</span>
                                    <span className="font-heading text-3xl font-bold text-slate-900">${(Number(order.total_amount) * 1.08).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Shipping Address</h3>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <strong>{order.user?.name || 'Customer'}</strong><br />
                                {order.user?.address_line_1 || 'No address line 1 provided'}<br />
                                {order.user?.city ? `${order.user.city}, ` : ''}{order.user?.state} {order.user?.postal_code}<br />
                                {order.user?.phone && <><br />{order.user?.phone}</>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
