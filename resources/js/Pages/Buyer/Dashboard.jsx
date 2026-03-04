import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ recentOrders, paymentMethods }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-50 font-display">
            <Head title="My Account | Shopify" />

            {/* Simple Top Nav */}
            <div className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-inner hover:scale-105 transition-transform">
                    <span className="font-heading font-bold text-xl">S</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/cart" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-50">
                        <span className="material-icons text-xl">shopping_bag</span>
                    </Link>
                    <Link href="/logout" method="post" as="button" className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1">
                        <span className="material-icons text-sm">logout</span> Logout
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 animate-fade-in-up">
                    <div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-2">Welcome, {auth.user.name.split(' ')[0]}</h1>
                        <p className="text-slate-500 text-lg">{auth.user.email}</p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Recent Orders - Spans 2 cols */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col group hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-icons text-primary">local_shipping</span> Recent Orders
                            </h2>
                            <Link href="/my-orders" className="text-sm font-medium text-primary hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                View all <span className="material-icons text-xs">arrow_forward</span>
                            </Link>
                        </div>

                        {recentOrders && recentOrders.length > 0 ? (
                            <div className="space-y-4 flex-1">
                                {recentOrders.slice(0, 3).map(order => (
                                    <div key={order.id} className="flex justify-between items-center group/item p-3 hover:bg-slate-50 rounded-xl transition-colors -mx-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                                <span className="material-icons">inventory_2</span>
                                            </div>
                                            <div>
                                                <Link href={`/my-orders/${order.id}`} className="font-bold text-slate-800 hover:text-primary transition-colors block truncate max-w-[200px] sm:max-w-xs" title={order.items && order.items.length > 0 && order.items[0].product ? order.items[0].product.name : `Order #${order.id}`}>
                                                    {order.items && order.items.length > 0 && order.items[0].product
                                                        ? `${order.items[0].product.name}${order.items.length > 1 ? ` + ${order.items.length - 1}` : ''}`
                                                        : `Order #${order.id}`}
                                                </Link>
                                                <span className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-slate-900">${Number(order.total_amount).toLocaleString()}</span>
                                            <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">{order.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center py-8">
                                <span className="material-icons text-4xl mb-2 opacity-50">remove_shopping_cart</span>
                                <p className="text-sm">No orders yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Profile & Settings */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mt-10 -mr-10 transition-transform group-hover:scale-150 duration-700"></div>
                        <div className="relative z-10">
                            <h2 className="font-heading text-xl font-bold mb-2 flex items-center gap-2">
                                <span className="material-icons opacity-80">manage_accounts</span> Profile Profile
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">Update your personal details and password.</p>
                        </div>
                        <Link href="/profile" className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-center transition-colors shadow-inner flex items-center justify-center gap-2 relative z-10">
                            Edit Profile <span className="material-icons text-sm">edit</span>
                        </Link>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col group hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="material-icons text-primary">credit_card</span> Payment
                        </h2>
                        {paymentMethods && paymentMethods.length > 0 ? (
                            <div className="space-y-3 flex-1">
                                {paymentMethods.slice(0, 3).map((method) => (
                                    <div key={method.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">
                                                {method.brand === 'Visa' ? 'VISA' : (method.brand === 'MasterCard' ? 'MC' : method.brand.toUpperCase().substring(0, 4))}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">•••• {method.last4}</span>
                                        </div>
                                        <span className="text-xs text-slate-400">{String(method.expiry_month).padStart(2, '0')}/{String(method.expiry_year).substring(2)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 text-slate-500 text-sm">No payment methods saved.</div>
                        )}
                        <Link href="/buyer/payment-methods" className="mt-4 text-sm font-bold text-primary hover:underline text-left inline-block w-max">Manage Methods</Link>
                    </div>

                    {/* Addresses */}
                    <div className="md:col-span-2 lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col group hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="material-icons text-primary">location_on</span> Addresses
                        </h2>
                        <div className="flex-1">
                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2 block">Default Shipping</span>
                                {auth.user.address_line_1 ? (
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                        {auth.user.name}<br />
                                        {auth.user.address_line_1}<br />
                                        {auth.user.city}, {auth.user.state} {auth.user.postal_code}<br />
                                        {auth.user.phone && <span className="text-slate-500 mt-1 block">{auth.user.phone}</span>}
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No shipping address recorded yet.</p>
                                )}
                            </div>
                        </div>
                        <Link href="/profile" className="mt-4 text-sm font-bold text-primary hover:underline text-left block w-max">
                            Manage Addresses
                        </Link>
                    </div>

                    {/* Support / Tall-E */}
                    <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary to-primary-light text-white rounded-3xl p-8 shadow-lg shadow-primary/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between group hover:shadow-primary/40 transition-shadow animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20"></div>
                        <div className="relative z-10 md:w-2/3 mb-6 md:mb-0">
                            <h2 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
                                <span className="material-icons text-4xl">smart_toy</span> Need help? Ask Tall-E
                            </h2>
                            <p className="text-white/80 max-w-md text-lg">Your AI-powered shopping assistant is ready to help you find the perfect items and track your orders.</p>
                        </div>
                        <Link href="/buyer/assistant" className="relative z-10 bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer">
                            Chat with Tall-E <span className="material-icons text-sm">chat</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
