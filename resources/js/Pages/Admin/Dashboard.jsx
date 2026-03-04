import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({
    totalRevenue,
    totalCommissions,
    pendingPayoutsCount,
    pendingPayoutsTotal,
    activeSellersCount,
    ordersPendingPayment,
    ordersProcessing,
    pendingShops,
    manualVerificationOrders,
    verificationAlertCount,
    verifiedShops
}) {
    const { post, processing } = useForm();

    const approveShop = (id) => {
        post(`/admin/approve/${id}`, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard | Shopify" />

            {/* Top Bar Area */}
            <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 md:static z-40 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-slate-900">Overview</h1>
                        <p className="text-sm text-slate-500">Monitor your marketplace performance and pending actions.</p>
                    </div>
                    {verificationAlertCount > 0 && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-sm animate-pulse">
                            <span className="material-icons text-amber-500 text-sm">warning</span>
                            {verificationAlertCount} Action{verificationAlertCount > 1 ? 's' : ''} Required
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gross Volume</span>
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
                                <span className="material-icons text-sm">attach_money</span>
                            </div>
                        </div>
                        <h3 className="font-heading text-4xl font-bold text-slate-900 relative z-10">${Number(totalRevenue || 0).toLocaleString()}</h3>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Platform Fees</span>
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors shadow-sm">
                                <span className="material-icons text-sm">account_balance_wallet</span>
                            </div>
                        </div>
                        <h3 className="font-heading text-4xl font-bold text-slate-900 relative z-10">${Number(totalCommissions || 0).toLocaleString()}</h3>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active Sellers</span>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                                <span className="material-icons text-sm">storefront</span>
                            </div>
                        </div>
                        <h3 className="font-heading text-4xl font-bold text-slate-900 relative z-10">{activeSellersCount}</h3>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pending Payouts</span>
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                                <span className="material-icons text-sm">outbox</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between relative z-10">
                            <h3 className="font-heading text-4xl font-bold text-slate-900">${Number(pendingPayoutsTotal || 0).toLocaleString()}</h3>
                            <span className="text-[10px] text-slate-600 font-bold bg-white/80 border border-amber-200 px-2.5 py-1 rounded-md shadow-sm">{pendingPayoutsCount} req</span>
                        </div>
                    </div>
                </div>

                {/* Workflow Alerts & Lists */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Action Required Board */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-icons text-amber-500">priority_high</span> Action Required
                            </h2>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verifications</span>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto max-h-[400px]">
                            {pendingShops && pendingShops.length > 0 ? (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block border-b border-slate-100 pb-2">Pending Shop Approvals</h3>
                                    {pendingShops.map(shop => (
                                        <div key={shop.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{shop.shop_name}</h4>
                                                <p className="text-xs text-slate-500">Applicant: {shop.user?.email}</p>
                                            </div>
                                            <button
                                                onClick={() => approveShop(shop.id)}
                                                disabled={processing}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            {manualVerificationOrders && manualVerificationOrders.length > 0 ? (
                                <div className="space-y-4 mt-6">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block border-b border-slate-100 pb-2">Manual Payment Reviews</h3>
                                    {manualVerificationOrders.map(order => (
                                        <div key={order.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div>
                                                <h4 className="font-bold text-slate-900">Order #{order.id}</h4>
                                                <p className="text-xs text-slate-500">Amount: ${Number(order.total_amount).toLocaleString()}</p>
                                            </div>
                                            <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                                                Review
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            {(pendingShops.length === 0 && manualVerificationOrders.length === 0) && (
                                <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-slate-400 py-8">
                                    <span className="material-icons text-5xl mb-3 opacity-20">check_circle</span>
                                    <p className="text-sm">All caught up! No pending actions.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Operational Overview */}
                    <div className="space-y-6">

                        {/* Performance Chart Placeholder */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <h2 className="font-heading text-lg font-bold text-slate-900">Revenue Overview</h2>
                                <select className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg focus:ring-primary focus:ring-2 outline-none py-2 px-3 tracking-wide">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            <div className="h-48 flex items-end justify-between gap-3 px-2 pb-4 border-b border-slate-100 relative mt-4 z-10">
                                {/* Mock Chart Bars */}
                                <div className="absolute left-0 top-0 bottom-4 border-r border-slate-100 flex flex-col justify-between text-[10px] text-slate-400 font-bold pb-2 pr-4 tracking-wider">
                                    <span>$10k</span>
                                    <span>$5k</span>
                                    <span>$0</span>
                                </div>
                                <div className="w-full h-full flex items-end justify-between gap-2 pl-12">
                                    {[40, 60, 45, 80, 50, 90, 75].map((height, i) => (
                                        <div key={i} className="w-full bg-primary/10 rounded-t-lg relative group transition-all duration-300 hover:bg-primary/20 cursor-pointer flex items-end" style={{ height: '100%' }}>
                                            <div className="w-full bg-primary rounded-t-sm transition-all duration-700 ease-out shadow-lg shadow-primary/20" style={{ height: `${height}%` }}></div>
                                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute bottom-[calc(${height}%+10px)] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-xl">
                                                ${(height * 120).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between pl-12 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        {/* Order Queue */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="font-heading text-lg font-bold text-slate-900">Marketplace Queue</h2>
                            </div>
                            <div className="p-6 flex gap-6">
                                <div className="flex-1 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border border-amber-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform shadow-sm">
                                    <span className="text-4xl font-heading font-black text-amber-600 mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">{ordersPendingPayment}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Awaiting Payment</span>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform shadow-sm">
                                    <span className="text-4xl font-heading font-black text-blue-600 mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">{ordersProcessing}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Processing</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Verified Shops */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="font-heading text-lg font-bold text-slate-900">Recently Verified Shops</h2>
                                <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">View All</Link>
                            </div>
                            <div className="p-0">
                                {verifiedShops && verifiedShops.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {verifiedShops.map(shop => (
                                            <div key={shop.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold">
                                                        {shop.shop_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">{shop.shop_name}</h4>
                                                        <p className="text-xs text-slate-500">{shop.user?.email}</p>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-md border border-emerald-100">Active</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500 text-sm">No verified shops yet.</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
