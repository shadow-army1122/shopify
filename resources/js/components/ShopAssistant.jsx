import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function ShopAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            sender: 'bot',
            text: "Hello! I'm Tall-E. I can find anything in the store for you. Try asking for \"summer dresses\" or \"wireless headphones\"!"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showBubble, setShowBubble] = useState(true);
    const [placeholder, setPlaceholder] = useState("Ask me anything...");
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setShowBubble(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Dynamic Placeholders
    useEffect(() => {
        const placeholders = [
            "Find me a red summer dress...",
            "I need running shoes...",
            "Gifts for my dad...",
            "Cheap electronics...",
            "Vintage leather jackets..."
        ];
        let index = 0;
        const interval = setInterval(() => {
            if (!isOpen && input === '') {
                setPlaceholder(placeholders[index]);
                index = (index + 1) % placeholders.length;
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isOpen, input]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('/shop-assistant/enquire', { query: userMessage });
            const data = response.data;

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: data.message,
                products: data.products
            }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: "Oops! I got a bit dizzy. Can you try again?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="shop-assistant-widget" className="fixed bottom-8 right-8 z-[9999] hidden md:block animate-float">
            <div className="relative">
                {/* Speech Bubble */}
                {showBubble && !isOpen && (
                    <div className="absolute bottom-full right-0 mb-4 bg-white shadow-xl rounded-lg rounded-br-none p-4 w-64 border border-slate-100 transform origin-bottom-right transition-transform hover:scale-105 animate-fade-in-up">
                        <p className="text-sm font-medium text-slate-800">Hey there! 👋 <br /> Looking for something specific? I can scan the marketplace for you.</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={toggleChat} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors">Yes, please!</button>
                            <button onClick={() => setShowBubble(false)} className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1">No thanks</button>
                        </div>
                    </div>
                )}

                {/* Avatar */}
                <button onClick={toggleChat} className="w-20 h-20 bg-transparent rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer group hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity rounded-full"></div>
                    <img src="/images/Tall-E.png" alt="Tall-E" className="relative z-10 w-full h-full rounded-full object-cover border-4 border-white bg-white" />
                </button>
            </div>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300 z-[9999] flex flex-col overflow-hidden h-[600px] ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center border border-white/20 overflow-hidden">
                            <img src="/images/Tall-E.png" alt="Tall-E" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold tracking-wide">Tall-E</h3>
                            <span className="text-[10px] uppercase tracking-wider text-green-400 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button onClick={toggleChat} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start gap-3'} animate-fade-in-up`}>
                            {msg.sender === 'bot' && (
                                <img src="/images/Tall-E.png" alt="Tall-E" className="w-8 h-8 rounded-full border border-gray-200 object-cover flex-shrink-0 bg-white" />
                            )}
                            <div className={`${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none shadow-md' : 'bg-white rounded-tl-none shadow-sm border border-gray-100 text-gray-700'} p-3.5 rounded-2xl text-sm max-w-[85%]`}>
                                <p>{msg.text}</p>
                                {msg.products && (
                                    <div className="grid grid-cols-1 gap-2 mt-3">
                                        {msg.products.map(product => (
                                            <Link key={product.id} href={`/product/${product.slug}`} className="block group glass-panel rounded-xl overflow-hidden hover:shadow-lg transition-all border-0 bg-white">
                                                <div className="flex gap-3 p-2">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                                                        {product.image_url ? (
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.name}
                                                                className="w-full h-full object-contain object-center mix-blend-multiply p-1"
                                                                title="NOTE: Kept as object-contain object-center per smart image container review."
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">Recommended</p>
                                                        <h4 className="text-sm font-heading font-bold text-slate-800 truncate group-hover:text-primary transition-colors">{product.name}</h4>
                                                        <div className="mt-1 font-bold text-sm text-slate-900">${Number(product.price).toFixed(2)}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 animate-pulse">
                            <img src="/images/Tall-E.png" alt="Tall-E" className="w-8 h-8 rounded-full border border-gray-200 object-cover flex-shrink-0 bg-white" />
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-500 italic">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <form onSubmit={handleSubmit} className="relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3.5 pr-12 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder-gray-400 font-medium text-gray-700 outline-none"
                            placeholder={placeholder}
                        />
                        <button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-primary rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 hover:text-primary-dark transition-all disabled:opacity-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
