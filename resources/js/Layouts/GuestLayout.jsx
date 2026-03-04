import React from 'react';
import { Link } from '@inertiajs/react';
import InteractiveBackground from '@/Components/InteractiveBackground';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-light font-display relative overflow-hidden flex flex-col items-center justify-center p-4 py-12">
            <InteractiveBackground />

            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="block h-12 group">
                    <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in-up mt-6 px-6 py-8 bg-white/50 backdrop-blur-md shadow-xl border border-white/20 sm:rounded-3xl">
                {children}
            </div>
        </div>
    );
}
