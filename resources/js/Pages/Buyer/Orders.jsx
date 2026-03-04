import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Orders({ orders }) {
    return (
        <div className="min-h-screen bg-slate-50 font-display">
            <Head title="Order History | Shopify" />

            {/* Simple Top Nav */}
            <div className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
                    <span className="material-icons text-sm">arrow_back</span> Back to Dashboard
                </Link>
                <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-inner hover:scale-105 transition-transform">
                    <span className="font-heading font-bold text-xl">S</span>
                </Link>
                <Link href="/cart" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-50">
                    <span className="material-icons text-xl">shopping_bag</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10 animate-fade-in-up">
                    <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Order History</h1>
                    <p className="text-slate-500 text-lg">Check the status of recent orders, manage returns, and discover similar products.</p>
                </div>

                <div className="space-y-6">
                    {orders.data && orders.data.length > 0 ? orders.data.map((order, idx) => (
                        <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up group hover:shadow-md transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-wrap justify-between items-center bg-slate-50/50">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Order Placed</span>
                                        <span className="font-medium text-slate-900">{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Amount</span>
                                        <span className="font-medium text-slate-900">${Number(order.total_amount).toLocaleString()}</span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Order #</span>
                                        <span className="font-mono text-slate-900">{order.id}</span>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 flex gap-4 items-center">
                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 font-bold text-xs uppercase tracking-wider rounded-full border border-amber-100">
                                        {order.status.replace('_', ' ')}
                                    </span>
                                    <Link href={`/my-orders/${order.id}`} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                        View Order <span className="material-icons text-sm">chevron_right</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="space-y-6">
                                    {order.items && order.items.slice(0, 2).map(item => (
                                        <div key={item.id} className="flex items-center gap-6">
                                            <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0 relative group/img cursor-pointer">
                                                {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                                <img src={item.product?.image_url || `https://placehold.co/200x200/f8f8f8/e5e5e5?text=${encodeURIComponent(item.product?.name || 'Item')}`} alt={item.product?.name} className="w-full h-full object-contain object-center mix-blend-multiply transition-transform group-hover/img:scale-110 p-2" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 text-lg hover:text-primary transition-colors cursor-pointer w-max">{item.product?.name || 'Unknown Item'}</h4>
                                                <p className="text-sm text-slate-500 mt-1">Quantity: {item.quantity}</p>
                                                <div className="mt-3 flex gap-4">
                                                    <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-slate-100 px-4 py-2 rounded-full hover:bg-primary/10">Buy it again</button>
                                                    <Link href={`/product/${item.product?.slug || '#'}`} className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50">View product</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items && order.items.length > 2 && (
                                        <div className="text-center pt-2">
                                            <Link href={`/my-orders/${order.id}`} className="text-sm font-medium text-slate-500 hover:text-primary">
                                                + {order.items.length - 2} more items
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-24 bg-white rounded-3xl border border-slate-200">
                            <span className="material-icons text-6xl text-slate-200 mb-4 block">receipt_long</span>
                            <h3 className="font-heading text-2xl font-bold text-slate-800 mb-2">No orders found</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven't placed any orders yet. Once you make a purchase, it will appear here.</p>
                            <Link href="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg">Start Shopping</Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                            {orders.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${link.active ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
