import React from 'react';
import { Head, Link } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';

export default function About() {
    return (
        <StorefrontLayout>
            <Head title="About Us | Shopify" />

            <div className="bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-50 -translate-y-1/2 rounded-full"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Redefining <br /> Ecommerce.</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We believe shopping should be an experience, not a chore. That's why we've blended cutting-edge AI with premium design to curate the best products just for you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group animate-fade-in-up">
                        <div className="absolute inset-0 bg-primary/10 -ml-6 -mt-6 rounded-3xl blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                        <img
                            src="/assets/about-team.jpg"
                            alt="Our Office"
                            className="relative z-10 w-full rounded-3xl shadow-2xl object-cover h-[500px]"
                        />
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                        <h2 className="font-heading text-4xl font-bold text-slate-900 mb-6">Born from a simple idea: Make it beautiful.</h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2024, our platform was built to bridge the gap between boutique, high-end shopping experiences and the convenience of the digital world.
                            </p>
                            <p>
                                We're a team of designers, engineers, and dreamers obsessed with detail. We vet every seller on our platform to ensure that when you buy from us, you're buying quality you can trust.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div>
                                <h4 className="font-heading text-4xl font-bold text-slate-900 mb-1">1M+</h4>
                                <span className="text-slate-500 font-medium">Happy Customers</span>
                            </div>
                            <div>
                                <h4 className="font-heading text-4xl font-bold text-slate-900 mb-1">50k+</h4>
                                <span className="text-slate-500 font-medium">Curated Products</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8">Ready to discover something amazing?</h2>
                    <Link href="/" className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                        Start Shopping <span className="material-icons ml-2 text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </StorefrontLayout>
    );
}
