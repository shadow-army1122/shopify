import React, { useState, useEffect } from 'react';
import InteractiveBackground from '@/Components/InteractiveBackground';
import { Link, usePage } from '@inertiajs/react';
import ShopAssistant from '@/Components/ShopAssistant';

export default function StorefrontLayout({ children }) {
    const { auth, cartCount } = usePage().props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#fcfdfd] text-slate-800 font-display relative overflow-x-hidden min-h-screen">
            <InteractiveBackground />

            {/* Hanging Pendulum Navbar */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4 md:pt-8 w-full max-w-fit px-4 pointer-events-none flex justify-center">
                <div className="relative pointer-events-auto">
                    {/* Hanging Cables */}
                    <div className="hidden md:block absolute -top-8 left-12 w-[2px] h-8 bg-slate-300 shadow-sm"></div>
                    <div className="hidden md:block absolute -top-8 right-12 w-[2px] h-8 bg-slate-300 shadow-sm"></div>

                    <nav className="hanging-nav pendulum-swing rounded-[2rem] px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8">
                        {/* Left: Logo */}
                        <Link href="/" className="flex items-center gap-2 group relative">
                            <img src="/images/logo.png" alt="Company Logo" className="w-auto h-10 object-contain transition-transform duration-500 group-hover:scale-105" />
                        </Link>

                        {/* Center: Navigation Links (Desktop) */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary transition-colors">Home</Link>
                            <a href="/#collection" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary transition-colors">Collection</a>
                            <Link href="/about" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary transition-colors">About Us</Link>
                            <Link href="/faq" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary transition-colors">FAQ</Link>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-white/50 transition-colors">
                                <span className="material-icons text-xl">search</span>
                            </button>

                            <Link href="/cart" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-white/50 transition-colors relative group">
                                <span className="material-icons text-xl group-hover:scale-110 transition-transform">shopping_cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white/50">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="w-px h-6 bg-slate-300 mx-1 hidden sm:block"></div>

                            {auth.user ? (
                                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 pl-2 group">
                                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login" className="hidden sm:flex items-center justify-center text-slate-700 hover:bg-white/50 rounded-full w-10 h-10 transition-colors">
                                    <span className="material-icons text-[24px]">account_circle</span>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-32 pb-12 px-4 max-w-7xl mx-auto space-y-16">
                {children}
            </main>

            {/* Shop Assistant */}
            <ShopAssistant />

            {/* Premium Mobile Bottom Nav */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[400px]">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-full p-2 flex justify-between items-center shadow-2xl border border-white/10 relative">
                    <Link href="/" className="flex flex-col items-center justify-center w-12 h-12 rounded-full overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-icons text-white text-[22px]">home</span>
                        <span className="text-[9px] font-bold text-white/70 tracking-wider mt-0.5">Home</span>
                    </Link>

                    <a href="/#collection" className="flex flex-col items-center justify-center w-12 h-12 rounded-full overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-icons text-slate-400 group-hover:text-white transition-colors text-[22px]">grid_view</span>
                        <span className="text-[9px] font-bold text-slate-400 group-hover:text-white/70 tracking-wider mt-0.5 transition-colors">Shop</span>
                    </a>

                    {/* Floating Center Action */}
                    <Link href="/cart" className="relative -mt-8 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-orange-500 rounded-full text-white shadow-xl shadow-primary/30 ring-4 ring-slate-900/20 group hover:scale-105 transition-transform duration-300">
                        <span className="material-icons text-[24px]">shopping_bag</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-primary shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link href="/dashboard" className="flex flex-col items-center justify-center w-12 h-12 rounded-full overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-icons text-slate-400 group-hover:text-white transition-colors text-[22px]">person</span>
                        <span className="text-[9px] font-bold text-slate-400 group-hover:text-white/70 tracking-wider mt-0.5 transition-colors">Account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
