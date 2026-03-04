import React, { useState, useRef, useEffect } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';

export default function Assistant({ auth }) {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello! I've been trained on the latest marketplace policies. How can I assist you today?" }
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
            // Note: Since this is purely Javascript fetch and not Inertia visit, 
            // ensure the CSRF token is available (Laravel/Inertia usually manages this if we use axios)
            const response = await window.axios.post(route('seller.assistant.chat'), {
                message: text
            });

            if (response.data && response.data.reply) {
                setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
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
        <SellerLayout
            header={<span className="text-slate-800">Seller Assistant</span>}
        >
            <Head title="Seller Assistant" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[600px] flex flex-col">

                        {/* Chat Header */}
                        <div className="p-6 bg-gradient-to-r from-primary-600 to-indigo-600 text-white flex gap-4 items-center shrink-0">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display">AI Policy Expert</h3>
                                <p className="text-white/80 text-sm">Ask about fees, shipping, or returns.</p>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 flex flex-col">
                            {messages.map((msg, index) => {
                                const isUser = msg.role === 'user';
                                return (
                                    <div key={index} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full ${isUser ? 'bg-gray-200' : 'bg-primary-100'} flex items-center justify-center shrink-0`}>
                                            <span className={`text-xs font-bold ${isUser ? 'text-gray-600' : 'text-primary-600'}`}>{isUser ? 'You' : 'AI'}</span>
                                        </div>
                                        <div className={`p-4 rounded-2xl shadow-sm max-w-[80%] ${isUser
                                            ? 'bg-primary-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                            }`}>
                                            <p className="whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-primary-600">AI</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center h-12">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                            <form onSubmit={handleSubmit} className="flex gap-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 rounded-full border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-6"
                                    placeholder="Type your question here..."
                                    disabled={isTyping}
                                    autoFocus
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isTyping || !input.trim()}
                                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-600 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>Send</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
