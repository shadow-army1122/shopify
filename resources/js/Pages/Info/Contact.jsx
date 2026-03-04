import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import TextInput from '@/Components/TextInput';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully! We will get back to you within 24 hours.');
        e.target.reset();
    };

    return (
        <StorefrontLayout>
            <Head title="Contact Us | Shopify" />

            <div className="bg-slate-50 py-16 md:py-24 font-display">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-slate-900 mb-6">How can we help?</h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Whether you have a question about an order, a product, or you just want to say hi, our team is always ready to assist you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Send a Message</h2>

                            {status && (
                                <div className="mb-8 p-4 bg-green-50 text-green-600 rounded-xl border border-green-100 text-sm font-medium">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                        <TextInput type="text" className="w-full bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary rounded-xl" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                        <TextInput type="text" className="w-full bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary rounded-xl" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <TextInput type="email" className="w-full bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary rounded-xl" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                    <select className="w-full bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary rounded-xl text-slate-700 h-[46px]" required>
                                        <option value="">Select a topic...</option>
                                        <option value="order">Order Status</option>
                                        <option value="return">Returns & Exchanges</option>
                                        <option value="product">Product Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea className="w-full bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary rounded-xl resize-none h-32 p-3 text-slate-700" required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-primary transition-colors shadow-lg shadow-slate-900/20 group flex items-center justify-center gap-2">
                                    Send Message <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">send</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="material-icons text-primary text-3xl">storefront</span> Our Headquarters
                                </h3>
                                <div className="text-slate-600 text-lg leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <p className="font-medium text-slate-800 mb-2">Shopify Global Hub</p>
                                    <p>123 Commerce Avenue<br />Silicon Valley, CA 94025<br />United States</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="material-icons text-primary text-3xl">support_agent</span> Direct Lines
                                </h3>
                                <div className="space-y-4">
                                    <a href="mailto:support@shopify.demo" className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-primary transition-colors group">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                            <span className="material-icons">email</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Email Us</p>
                                            <p className="font-medium text-slate-900 group-hover:text-primary transition-colors">support@shopify.demo</p>
                                        </div>
                                    </a>
                                    <a href="tel:+18001234567" className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-primary transition-colors group">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                            <span className="material-icons">phone</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Call Us (Toll-Free)</p>
                                            <p className="font-medium text-slate-900 group-hover:text-primary transition-colors">+1 (800) 123-4567</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
