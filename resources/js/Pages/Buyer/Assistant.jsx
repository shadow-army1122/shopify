import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Assistant({ auth }) {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi there! I'm Tall-E, your personal shopping assistant. I can help you find products, track your orders, or provide styling advice. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;

        // Add user message to UI
        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await window.axios.post(route('shop.assistant.enquire'), {
                query: text
            });

            if (response.data && response.data.message) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    text: response.data.message,
                    products: response.data.products || []
                }]);
            } else {
                setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'ai', text: "Network error. Please check your connection." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Chat with Tall-E</h2>}
        >
            <Head title="Tall-E Assistant | Shopify" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl shadow-primary/5 sm:rounded-3xl h-[650px] flex flex-col border border-slate-100">

                        {/* Chat Header */}
                        <div className="p-6 bg-gradient-to-r from-primary to-primary-light text-white flex gap-4 items-center shrink-0">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner overflow-hidden">
                                <span className="material-icons text-3xl">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-heading">Tall-E</h3>
                                <p className="text-white/80 text-sm font-medium">AI Shopping Assistant • Always Online</p>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 flex flex-col scroll-smooth">
                            {messages.map((msg, index) => {
                                const isUser = msg.role === 'user';
                                return (
                                    <div key={index} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
                                        <div className={`w-10 h-10 rounded-full ${isUser ? 'bg-slate-200' : 'bg-primary/20'} flex items-center justify-center shrink-0 shadow-sm`}>
                                            <span className={`material-icons text-sm ${isUser ? 'text-slate-600' : 'text-primary'}`}>
                                                {isUser ? 'person' : 'smart_toy'}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2 max-w-[80%]">
                                            <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed ${isUser
                                                ? 'bg-slate-900 text-white rounded-tr-sm'
                                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                                                }`}>
                                                {/* If AI message requires markdown rendering, could use a markdown parser, but here we just render text */}
                                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                            </div>

                                            {/* Render Product Cards if included in AI response */}
                                            {msg.products && msg.products.length > 0 && (
                                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                                    {msg.products.map(product => (
                                                        <Link href={`/product/${product.slug}`} key={product.id} className="min-w-[200px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:border-primary/50 transition-colors">
                                                            <div className="h-32 bg-slate-100 relative">
                                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                            </div>
                                                            <div className="p-3">
                                                                <h5 className="font-medium text-slate-900 truncate text-sm">{product.name}</h5>
                                                                <p className="text-primary font-bold mt-1">${parseFloat(product.price).toFixed(2)}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-4 animate-fade-in-up">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                                        <span className="material-icons text-sm text-primary">smart_toy</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center h-[52px]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce"></div>
                                            <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                                            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white shrink-0 border-t border-slate-100">
                            <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full rounded-full border-slate-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white transition-colors py-4 pl-6 pr-12"
                                        placeholder="Ask about orders, sizing, or product recommendations..."
                                        disabled={isTyping}
                                        autoFocus
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-icons">mic</span>
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isTyping || !input.trim()}
                                    className="bg-primary text-white w-14 h-14 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span className="material-icons group-hover:scale-110 transition-transform">send</span>
                                </button>
                            </form>
                            <p className="text-center text-[10px] text-slate-400 mt-3">Tall-E can make mistakes. Consider verifying important information.</p>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
