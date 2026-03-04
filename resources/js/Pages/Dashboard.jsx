import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth, recentOrders, paymentMethods }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout header="My Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Profile Card (Span 2) */}
                <div className="lg:col-span-2 group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100 relative h-full flex flex-col animate-fade-in-up">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-32 h-32 text-primary-500 transform rotate-12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full">
                        <div className="w-24 h-24 bg-primary-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary-600 shadow-inner">
                            <span className="font-display font-bold text-4xl">{user.name.charAt(0)}</span>
                        </div>

                        <div className="flex-grow">
                            <h3 className="font-display font-bold text-3xl text-gray-900 mb-1">{user.name}</h3>
                            <p className="text-gray-500 font-medium mb-4">{user.email}</p>

                            <Link href={route('profile.edit')} className="inline-flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                Edit Details <span className="ml-1">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Shopping Stats (Span 1) */}
                <div className="lg:col-span-1 group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-gray-100 relative h-full flex flex-col animate-fade-in-up delay-100">
                    <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-primary-50 rounded-2xl border border-primary-100 text-primary-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                            <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-primary-100">Active</span>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-1">Total Orders</p>
                            <h3 className="font-display font-black text-6xl text-gray-900 tracking-tight">
                                {recentOrders.length}
                            </h3>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <Link href={route('seller.orders.index')} className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center justify-between group-hover:gap-3 transition-all">
                                View History <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. Recent Orders (Span 2) */}
                <div className="lg:col-span-2 bg-white overflow-hidden shadow-xl shadow-gray-200/40 rounded-2xl border border-gray-100 h-full flex flex-col animate-fade-in-up delay-200">
                    <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-display font-bold text-gray-900">Recent Orders</h3>
                            <p className="text-gray-500 text-sm mt-1">Your latest transaction history.</p>
                        </div>
                        <Link href={route('seller.orders.index')} className="text-sm font-bold text-gray-900 hover:text-primary-600 transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="flex-grow overflow-x-auto">
                        {recentOrders.length > 0 ? (
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Order</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentOrders.slice(0, 5).map((order) => {
                                        const statusClasses = {
                                            'delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                                            'processing': 'bg-blue-50 text-blue-600 border-blue-100',
                                            'shipped': 'bg-indigo-50 text-indigo-600 border-indigo-100',
                                            'cancelled': 'bg-red-50 text-red-600 border-red-100',
                                            'pending': 'bg-amber-50 text-amber-600 border-amber-100',
                                        };
                                        const currentClass = statusClasses[order.status] || 'bg-gray-50 text-gray-600 border-gray-100';

                                        return (
                                            <tr key={order.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900">#{order.id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">${parseInt(order.total_amount).toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${currentClass}`}>
                                                        {order.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link href={route('seller.orders.show', order.id)} className="text-gray-300 hover:text-primary-600 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-sm mb-4">No recent orders found</p>
                                <Link href={route('home')} className="inline-flex items-center px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-black transition-all">
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Payment Methods (Span 1) */}
                <div className="lg:col-span-1 group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100 flex flex-col h-full animate-fade-in-up delay-300">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-display font-bold text-lg text-gray-900">Wallet</h4>
                        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-grow space-y-3">
                        {paymentMethods && paymentMethods.length > 0 ? (
                            paymentMethods.map((method, index) => (
                                <div key={index} className="group/card relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100 p-4 hover:border-primary-200 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
                                                {method.brand.substring(0, 2)}
                                            </div>
                                            <span className="font-display font-bold text-gray-900 tracking-wide text-sm">•••• {method.last4}</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-100 rounded-xl">
                                <p className="text-gray-400 text-sm mb-2">No cards linked</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-primary-600 transition-colors">Manage Payment Methods</a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
