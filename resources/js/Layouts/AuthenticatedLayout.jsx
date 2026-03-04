import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans antialiased">
            {/* Sidebar (Desktop) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full z-10 transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link href="/" className="h-8 block group">
                        <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                    </Link>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-full pb-20">
                    <NavLink href={route('home')} active={route().current('home')}>
                        <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </NavLink>

                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Overview</p>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                    </NavLink>

                    {(user.role === 'seller' || user.shop) && (
                        <>
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Seller Tools</p>
                            <NavLink href={route('products.index')} active={route().current('products.*')}>
                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Products
                            </NavLink>
                            <NavLink href={route('seller.orders.index')} active={route().current('seller.orders.*')}>
                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Orders
                            </NavLink>
                            <NavLink href={route('seller.payouts.index')} active={route().current('seller.payouts.*')}>
                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Payouts
                            </NavLink>
                        </>
                    )}

                    {user.role === 'admin' && (
                        <>
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Administration</p>
                            <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verifications
                            </NavLink>
                            <NavLink href={route('admin.payouts.index')} active={route().current('admin.payouts.*')}>
                                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Payout Approvals
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="absolute bottom-0 w-full border-t border-gray-100 p-4 bg-white">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs bg-primary">
                            {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-xs font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Mobile Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center md:hidden">
                                    <Link href="/" className="font-display font-bold text-lg">MarketPlace</Link>
                                </div>
                                <div className="hidden md:flex ml-4 items-center">
                                    <div className="font-bold text-xl text-gray-800 leading-tight font-display">
                                        {header || 'Dashboard'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Link method="post" href={route('logout')} as="button" className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    {header && (
                        <div className="md:hidden font-bold text-xl text-gray-800 mb-6 font-display">
                            {header}
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors mb-4 border border-transparent ${active
                ? 'bg-primary-50 text-primary-700 text-primary'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-100'
                }`}
        >
            {children}
        </Link>
    );
}
