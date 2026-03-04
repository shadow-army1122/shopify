import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Success({ order }) {
    if (!order) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-display">
            <Head title={`Order #${order.id} Confirmed | Shopify`} />

            {/* Simple Nav */}
            <div className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-inner">
                    <span className="font-heading font-bold text-xl">S</span>
                </Link>
                <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-icons text-sm">person</span> My Account
                </Link>
            </div>

            <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                        <span className="material-icons text-4xl">check_circle</span>
                    </div>
                    <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">Order Confirmed</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">Thank you for your purchase!</h1>
                    <p className="text-slate-500 text-lg">We've received your order and are getting it ready to be shipped.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="p-6 md:p-8 border-b border-slate-200 flex flex-wrap gap-6 justify-between items-center bg-slate-50">
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">Order Number</span>
                            <span className="font-bold text-slate-900 font-mono text-lg">#{order.id}</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">Date</span>
                            <span className="font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">Total</span>
                            <span className="font-bold text-slate-900">${Number(order.total_amount).toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block mb-1">Payment Method</span>
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                                <span className="material-icons text-sm">credit_card</span> Card
                            </span>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 pb-0">
                        <h3 className="font-bold text-slate-900 mb-6">Order Details</h3>
                        <div className="space-y-6">
                            {order.items && order.items.map(item => (
                                <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-slate-100 last:border-0">
                                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                        {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                        <img src={item.product?.image_url || `https://placehold.co/150x150/f8f8f8/e5e5e5?text=${encodeURIComponent(item.product?.name || 'Item')}`} alt={item.product?.name} className="w-full h-full object-contain object-center mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{item.product?.name || 'Unknown Product'}</h4>
                                        <p className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">Total Paid</span>
                        <span className="font-heading text-2xl font-bold text-slate-900">${Number(order.total_amount).toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-icons text-primary">local_shipping</span> Shipping Details
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <strong>To:</strong> Jane Doe<br />
                            123 Commerce St.<br />
                            Silicon Valley, CA, 94025<br />
                            United States
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <span className="material-icons">inventory_2</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Track Your Delivery</h3>
                        <p className="text-sm text-slate-500 mb-4">You can view real-time updates for this order in your dashboard.</p>
                        <Link href={`/my-orders/${order.id}`} className="text-primary font-bold hover:underline text-sm">
                            View Order Status
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-12 mb-8">
                    <Link href="/" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors shadow-lg inline-flex items-center gap-2">
                        <span className="material-icons text-sm">shopping_bag</span> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
