import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
        { name: 'Users', path: '/admin/users', icon: 'group' },
        { name: 'Payouts', path: '/admin/payouts', icon: 'payments' },
        { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-display flex flex-col md:flex-row">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 relative overflow-hidden z-20 shadow-lg">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                <div className="p-6 shrink-0 border-b border-white/5 relative z-10">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="h-10 shrink-0 group-hover:scale-105 transition-transform duration-300 z-10">
                            <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-xl block leading-none text-white tracking-wide">Shopify</span>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">Workspace</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 p-4 overflow-y-auto relative z-10 scrollbar-hide">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4 mt-2">Main Menu</div>
                    <nav className="space-y-1.5">
                        {navItems.map(item => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group relative overflow-hidden ${isActive(item.path)
                                    ? 'text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {isActive(item.path) && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary"></div>
                                )}
                                {!isActive(item.path) && (
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                )}
                                <span className={`material-icons relative z-10 transition-colors ${isActive(item.path) ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-white/5 shrink-0 relative z-10 bg-slate-900/50 backdrop-blur-md">
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0 uppercase">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-white truncate">{auth.user.name}</p>
                                <p className="text-xs text-slate-400 truncate capitalize">{auth.user.role}</p>
                            </div>
                        </div>
                        <Link href="/logout" method="post" as="button" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                            <span className="material-icons text-sm">logout</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Nav Top */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white">
                        <span className="font-heading font-bold text-sm">S</span>
                    </div>
                    <span className="font-bold tracking-wide">Admin</span>
                </Link>
                <div className="flex gap-4">
                    <Link href="/logout" method="post" as="button" className="material-icons text-slate-400 hover:text-rose-400 transition-colors">logout</Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative bg-slate-50">
                <div className="relative z-10 flex-1 flex flex-col w-full max-w-[1600px] mx-auto bg-slate-50">
                    {children}
                </div>
            </main>
        </div>
    );
}
