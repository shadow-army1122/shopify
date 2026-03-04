import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, shop, totalProducts, totalEarnings, pendingOrders, lowStockProducts, recentOrders, notifications }) {

    // Setup form for marking notifications as read
    const { patch } = useForm();

    const markAsRead = (id) => {
        patch(route('seller.notifications.markAsRead', id), {
            preserveScroll: true,
        });
    };

    return (
        <SellerLayout
            user={auth.user}
            header={<span className="text-slate-800">Dashboard</span>}
            bgType="interactive"
        >
            <Head title={`Dashboard | ${shop.shop_name}`} />

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">

                {/* Store Header & Quick Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-xl shadow-slate-200/50">
                    <div>
                        <h2 className="font-heading text-2xl font-black text-slate-800 tracking-tight">Welcome back, {auth.user.name}! 👋</h2>
                        <p className="text-slate-500 font-medium">Here's what's happening with <strong className="text-indigo-600">{shop.shop_name}</strong> today.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Link href={route('products.create')} className="btn-primary py-2.5 px-6 rounded-xl flex-1 md:flex-none justify-center">
                            <span className="material-icons text-sm mr-2">add</span> Add Product
                        </Link>
                    </div>
                </div>

                {/* Notifications Banner */}
                {notifications && notifications.length > 0 && (
                    <div className="font-display">
                        <div className="space-y-3">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-5 rounded-2xl flex justify-between items-start shadow-sm group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
                                    <div className="flex gap-4 items-start pl-2">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                            <span className="material-icons">notifications_active</span>
                                        </div>
                                        <div>
                                            <h4 className="text-slate-800 font-bold mb-1">{notification.title}</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">{notification.message}</p>
                                            <span className="text-xs text-slate-400 mt-2 block font-medium">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-100 transition-colors"
                                        title="Mark as read"
                                    >
                                        <span className="material-icons text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Earnings Card */}
                    <div className="glass-panel p-6 rounded-3xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-200/50">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl group-hover:bg-emerald-200/50 transition-colors"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Earnings</p>
                                <h3 className="font-heading text-4xl font-black text-slate-800 tracking-tight">
                                    <span className="text-emerald-500 mr-1">$</span>
                                    {parseFloat(totalEarnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h3>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                <span className="material-icons">payments</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center">
                                <span className="material-icons text-[10px] mr-1">trending_up</span> All time
                            </span>
                            <Link href={route('seller.payouts.index')} className="text-sm font-bold text-slate-400 hover:text-emerald-600 flex items-center transition-colors">
                                View Payouts <span className="material-icons text-xs ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="glass-panel p-6 rounded-3xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-200/50">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-colors"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Pending Orders</p>
                                <h3 className="font-heading text-4xl font-black text-slate-800 tracking-tight">
                                    {pendingOrders}
                                </h3>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <span className="material-icons">shopping_bag</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center">
                                Requires packing
                            </span>
                            <Link href={route('seller.orders.index')} className="text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center transition-colors">
                                Process Orders <span className="material-icons text-xs ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="glass-panel p-6 rounded-3xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-200/50">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl group-hover:bg-purple-200/50 transition-colors"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Products</p>
                                <h3 className="font-heading text-4xl font-black text-slate-800 tracking-tight">
                                    {totalProducts}
                                </h3>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                                <span className="material-icons">inventory_2</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 px-2 py-1 rounded-md flex items-center">
                                In catalog
                            </span>
                            <Link href={route('products.index')} className="text-sm font-bold text-slate-400 hover:text-purple-600 flex items-center transition-colors">
                                Manage Inventory <span className="material-icons text-xs ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* Recent Orders List */}
                    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full shadow-lg border border-white/40">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/40">
                            <h3 className="font-heading text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="material-icons text-indigo-500">receipt_long</span> Recent Orders
                            </h3>
                            <Link href={route('seller.orders.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                                View All
                            </Link>
                        </div>
                        <div className="p-0 flex-1">
                            {recentOrders && recentOrders.length > 0 ? (
                                <ul className="divide-y divide-slate-100/80">
                                    {recentOrders.map((order) => (
                                        <li key={order.id} className="p-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                    #{order.id}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{order.user?.name}</p>
                                                    <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                                                        <span className="material-icons text-[12px]">calendar_today</span>
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    order.status === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                                <Link href={route('seller.orders.show', order.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-slate-400 shadow-sm border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 transition-all group-hover:shadow-md">
                                                    <span className="material-icons text-sm">chevron_right</span>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-12 text-center flex flex-col items-center justify-center h-full text-slate-400">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-icons text-3xl text-slate-300">inbox</span>
                                    </div>
                                    <p className="font-medium text-slate-500">No orders yet.</p>
                                    <p className="text-sm mt-1">When customers place orders, they'll appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Alerts */}
                    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full shadow-lg border border-white/40">
                        <div className="px-6 py-5 border-b border-rose-100 bg-rose-50/30 flex justify-between items-center">
                            <h3 className="font-heading text-lg font-bold text-rose-600 flex items-center gap-2">
                                <span className="material-icons">warning_amber</span> Low Stock Alerts
                            </h3>
                        </div>
                        <div className="p-0 flex-1">
                            {lowStockProducts && lowStockProducts.length > 0 ? (
                                <ul className="divide-y divide-slate-100/80">
                                    {lowStockProducts.map((product) => (
                                        <li key={product.id} className="p-4 sm:p-6 hover:bg-rose-50/20 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="material-icons">image</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 line-clamp-1">{product.name}</p>
                                                    <p className="text-sm font-medium text-slate-500 mt-0.5">${parseFloat(product.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                                    <span className="text-sm font-bold text-rose-700">{product.stock} left</span>
                                                </div>
                                                <Link href={route('products.edit', product.id)} className="ml-auto sm:ml-0 text-sm font-bold text-rose-600 hover:text-rose-800 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1">
                                                    Restock <span className="material-icons text-[14px]">arrow_forward</span>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-12 text-center flex flex-col items-center justify-center h-full text-slate-400">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                                        <span className="material-icons text-3xl">check_circle</span>
                                    </div>
                                    <p className="font-medium text-slate-500">Inventory levels are healthy.</p>
                                    <p className="text-sm mt-1">None of your products are running low.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* AI Assistant Promo */}
                <div className="relative overflow-hidden group rounded-3xl shadow-xl shadow-indigo-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400 opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="font-heading text-2xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                                <span className="material-icons text-indigo-200">auto_awesome</span>
                                Meet your Seller AI Assistant
                            </h3>
                            <p className="text-indigo-100 text-lg max-w-xl">
                                Get instant answers about commission rates, shipping policies, strategies to boost sales, and more.
                            </p>
                        </div>
                        <Link href={route('seller.assistant.index')} className="shrink-0 bg-white text-indigo-700 font-bold py-3.5 px-8 rounded-xl hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group/btn hover:-translate-y-1">
                            Ask a Question
                            <span className="material-icons text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>

            </div>
        </SellerLayout>
    );
}
