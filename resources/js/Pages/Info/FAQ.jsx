import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';

export default function FAQ() {
    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (idx) => {
        setOpenItem(openItem === idx ? null : idx);
    };

    const faqs = [
        {
            q: "How fast is shipping?",
            a: "We offer free standard shipping (3-5 business days) on all orders over $50. Expedited shipping (1-2 business days) is available at checkout for an additional fee."
        },
        {
            q: "What is your return policy?",
            a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original condition with tags attached. The return shipping fee is deducted from your refund."
        },
        {
            q: "Do you ship internationally?",
            a: "Currently, we only ship within the contiguous United States, Alaska, and Hawaii. We are working hard to expand our footprint globally soon!"
        },
        {
            q: "How does the AI assistant work?",
            a: "Tall-E uses advanced natural language processing combined with our entire product catalog to give you real-time recommendations, summarize product reviews, and answer styling questions instantly."
        },
        {
            q: "How do I track my order?",
            a: "Once your order ships, you will receive a confirmation email with a tracking link. You can also view real-time tracking from your Dashboard under 'Recent Orders'."
        },
    ];

    return (
        <StorefrontLayout>
            <Head title="FAQ | Shopify" />

            <div className="bg-slate-50 py-16 md:py-24 font-display min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Help Center</span>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team or chat with Tall-E.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                                    <button
                                        onClick={() => toggleItem(idx)}
                                        className="w-full text-left p-6 font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                                    >
                                        {faq.q}
                                        <span className={`material-icons text-slate-400 transition-transform duration-300 ${openItem === idx ? 'rotate-180 text-primary' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItem === idx ? 'max-h-48' : 'max-h-0'}`}>
                                        <div className="p-6 pt-0 text-slate-600 leading-relaxed bg-slate-50/50">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <p className="text-slate-600 mb-4">Still need help?</p>
                        <Link href="/contact" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors shadow-lg shadow-slate-900/10">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
