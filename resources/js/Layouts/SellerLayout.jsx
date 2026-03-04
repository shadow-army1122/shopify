import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import InteractiveBackground from '@/Components/InteractiveBackground';

export default function SellerLayout({ header, children, bgType = 'gradient' }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const isActive = (path) => {
        if (path === '/seller/dashboard') {
            return url === '/seller/dashboard';
        }
        return url.startsWith(path);
    };

    const navItems = [
        { name: 'Overview', path: '/seller/dashboard', icon: 'dashboard', section: 'Core Operations' },
        { name: 'Inventory', path: '/products', icon: 'inventory_2', section: 'Core Operations' },
        { name: 'Orders', path: '/seller/orders', icon: 'local_shipping', section: 'Core Operations' },
        { name: 'Finances', path: '/seller/payouts', icon: 'account_balance_wallet', section: 'Core Operations' },
        { name: 'Analysis', path: '/seller/analysis', icon: 'query_stats', section: 'Intelligence' },
        { name: 'AI Assistant', path: '/seller/assistant', icon: 'auto_awesome', section: 'Intelligence', isSpecial: true },
    ];

    const SidebarContent = () => {
        let currentSection = null;

        return (
            <>
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                <div className="p-6 shrink-0 border-b border-slate-100 relative z-10 flex items-center justify-center">
                    <Link href="/seller/dashboard" className="flex items-center gap-3 group">
                        <div className="h-8 md:h-10 shrink-0 group-hover:scale-105 transition-transform duration-300 z-10">
                            <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain" />
                        </div>
                    </Link>
                </div>

                <div className="flex-1 p-4 overflow-y-auto relative z-10 scrollbar-hide">
                    <nav className="space-y-1.5">
                        {navItems.map(item => {
                            const showSection = item.section !== currentSection;
                            currentSection = item.section;

                            return (
                                <React.Fragment key={item.name}>
                                    {showSection && (
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-4 mt-6 first:mt-2">
                                            {item.section}
                                        </div>
                                    )}
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group relative overflow-hidden ${isActive(item.path)
                                            ? (item.isSpecial ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-50 text-indigo-600 shadow-sm border border-slate-100')
                                            : (item.isSpecial ? 'text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')
                                            }`}
                                    >
                                        {isActive(item.path) && !item.isSpecial && (
                                            <div className="absolute inset-0 border-l-4 border-indigo-600 rounded-l-xl"></div>
                                        )}
                                        <span className={`material-icons relative z-10 transition-colors ${isActive(item.path) || item.isSpecial
                                            ? (item.isSpecial && !isActive(item.path) ? 'text-indigo-500' : (item.isSpecial ? 'text-white' : 'text-indigo-600'))
                                            : 'text-slate-400 group-hover:text-slate-600'
                                            }`}>
                                            {item.icon}
                                        </span>
                                        <span className="relative z-10 w-full flex justify-between items-center">
                                            {item.name}
                                            {item.isSpecial && <span className="material-icons text-sm opacity-50">arrow_forward</span>}
                                        </span>
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-100 shrink-0 relative z-10 bg-slate-50/80 backdrop-blur-md">
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                {auth.user.avatar ? (
                                    <img src={auth.user.avatar} alt={auth.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="uppercase">{auth.user.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{auth.user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{auth.user.shop?.shop_name || 'My Shop'}</p>
                            </div>
                        </div>
                        <Link href="/logout" method="post" as="button" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-slate-400 transition-colors shrink-0 border border-transparent hover:border-rose-100">
                            <span className="material-icons text-sm">logout</span>
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-display flex flex-col md:flex-row relative overflow-hidden">
            {bgType === 'interactive' && <InteractiveBackground />}

            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 relative z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] shrink-0 h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Nav Top */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className="text-slate-500 hover:text-slate-900 focus:outline-none transition-colors"
                    >
                        <span className="material-icons">{showingNavigationDropdown ? 'close' : 'menu'}</span>
                    </button>
                    <Link href="/seller/dashboard" className="flex items-center gap-2 h-8">
                        <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain" />
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors text-slate-600 border border-slate-200 font-bold">Store</Link>
                </div>
            </div>

            {/* Mobile Sidebar overlay */}
            {showingNavigationDropdown && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden animate-fade-in" onClick={() => setShowingNavigationDropdown(false)}></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen min-w-0 bg-transparent relative z-10 transition-all duration-300">
                {/* Desktop Top Header Info Strip */}
                <header className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-30 shadow-sm h-16 items-center px-8 justify-between">
                    <div className="font-heading font-black text-xl text-slate-800 tracking-tight flex items-center gap-3">
                        {header}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2 border border-slate-200 bg-white">
                            <span className="material-icons text-sm">storefront</span>
                            View Store
                        </Link>
                        <div className="h-6 w-px bg-slate-200 mx-1"></div>
                        <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 bg-white">
                            <span className="material-icons text-xl">notifications</span>
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-1 animate-fade-in-up w-full max-w-[1600px] mx-auto overflow-x-hidden">
                    {/* Mobile Header Title */}
                    {header && (
                        <div className="md:hidden font-heading font-black text-2xl text-slate-800 mb-6 tracking-tight flex items-center gap-2">
                            {header}
                        </div>
                    )}
                    {children}
                </div>

                {/* Footer */}
                <footer className="mt-8 px-8 py-6 text-center text-slate-400 text-sm border-t border-slate-200/40 bg-white/20 backdrop-blur-md">
                    &copy; {new Date().getFullYear()} Shopify Marketplace. Empowering commerce everywhere.
                </footer>
            </main>
        </div>
    );
}
