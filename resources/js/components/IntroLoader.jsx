import React, { useEffect, useState } from 'react';

export default function IntroLoader({ onFinish }) {
    const [phase, setPhase] = useState('entering'); // entering, glowing, splitting

    useEffect(() => {
        // Master Timeline
        // 0.0s - 1.5s: Text reveals, rings spin
        const t1 = setTimeout(() => setPhase('glowing'), 1500);
        // 1.5s - 3.5s: Text shines brightly, rings hit full speed
        const t2 = setTimeout(() => setPhase('splitting'), 3500);
        // 3.5s - 4.7s: Doors slide apart. 
        const t3 = setTimeout(() => {
            onFinish();
        }, 4700);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onFinish]);

    const items = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" /><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" /></svg>, // Store/Bag
            left: '10%', delay: '0.2s', duration: '1.5s', endRot: '15deg', endY: '-40vh', scale: '0.9'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>, // Shirt
            left: '25%', delay: '0.5s', duration: '1.8s', endRot: '-20deg', endY: '-60vh', scale: '1.1'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>, // Camera
            left: '40%', delay: '0.3s', duration: '1.6s', endRot: '10deg', endY: '-50vh', scale: '1.0'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>, // Monitor/Laptop
            left: '70%', delay: '0.4s', duration: '1.7s', endRot: '25deg', endY: '-45vh', scale: '0.9'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>, // Headphones
            left: '85%', delay: '0.7s', duration: '2.0s', endRot: '-30deg', endY: '-55vh', scale: '1.2'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>, // Shopping Bag
            left: '15%', delay: '0.5s', duration: '1.6s', endRot: '45deg', endY: '-70vh', scale: '1.0'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>, // Smartphone
            left: '80%', delay: '0.3s', duration: '1.5s', endRot: '-10deg', endY: '-35vh', scale: '0.9'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7" /><polyline points="12 9 12 12 13.5 13.5" /><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" /></svg>, // Watch
            left: '60%', delay: '0.7s', duration: '1.8s', endRot: '-25deg', endY: '-50vh', scale: '1.1'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" ry="2" /><line x1="7" y1="8" x2="7" y2="4" /><line x1="17" y1="8" x2="17" y2="4" /></svg>, // Luggage/Bag
            left: '48%', delay: '0.9s', duration: '1.5s', endRot: '30deg', endY: '-75vh', scale: '1.2'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="4" /><circle cx="15" cy="12" r="4" /><path d="M22 17v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /></svg>, // Glasses
            left: '30%', delay: '0.8s', duration: '2.1s', endRot: '5deg', endY: '-55vh', scale: '1.1'
        },
    ];

    return (
        <div className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden flex items-center justify-center">

            {/* Left Sliding Door */}
            <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-[#030303] transition-transform duration-[1200ms] ease-[cubic-bezier(0.8,0,0.2,1)] shadow-[10px_0_50px_rgba(0,0,0,0.9)] z-10
                ${phase === 'splitting' ? '-translate-x-full' : 'translate-x-[0%]'}`}
            >
                {/* Glowing seam edge */}
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            </div>

            {/* Right Sliding Door */}
            <div
                className={`absolute top-0 right-0 w-1/2 h-full bg-[#030303] transition-transform duration-[1200ms] ease-[cubic-bezier(0.8,0,0.2,1)] shadow-[-10px_0_50px_rgba(0,0,0,0.9)] z-10
                ${phase === 'splitting' ? 'translate-x-full' : 'translate-x-[0%]'}`}
            >
                {/* Glowing seam edge */}
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            </div>

            {/* Glowing Content Container (Fades/Blur out when doors split) */}
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-700
                ${phase === 'splitting' ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100 blur-0'}`}
            >
                <style>
                    {`
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes spin-slow-reverse {
                            from { transform: rotate(360deg); }
                            to { transform: rotate(0deg); }
                        }
                        @keyframes dash {
                            0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
                            50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
                            100% { stroke-dasharray: 90, 200; stroke-dashoffset: -124px; }
                        }
                        @keyframes shine {
                            0% { background-position: 200% center; }
                            100% { background-position: -200% center; }
                        }
                        @keyframes text-reveal {
                            0% { opacity: 0; transform: translateY(20px) scale(0.9); letter-spacing: 0.4em; filter: blur(10px); text-shadow: 0 0 0 rgba(239,84,1,0); }
                            100% { opacity: 1; transform: translateY(0) scale(1); letter-spacing: 0.1em; filter: blur(0px); text-shadow: 0 0 40px rgba(239,84,1,0.4); }
                        }
                        @keyframes fade-in-up {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes throw-item {
                            0% { transform: translateY(20vh) rotate(-90deg) scale(0.5); }
                            100% { transform: translateY(var(--end-y)) rotate(var(--end-rot)) scale(var(--scale)); }
                        }
                        @keyframes float-item {
                            0% { transform: translateY(var(--end-y)) rotate(var(--end-rot)) scale(var(--scale)); }
                            100% { transform: translateY(calc(var(--end-y) - 30px)) rotate(calc(var(--end-rot) + 15deg)) scale(var(--scale)); }
                        }
                        @keyframes fade-in-item {
                            0% { opacity: 0; }
                            20% { opacity: 1; }
                            100% { opacity: 0.6; }
                        }
                    `}
                </style>

                {/* Thrown SVG Icons Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none text-white">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="absolute bottom-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300"
                            style={{
                                left: item.left,
                                '--end-y': item.endY,
                                '--end-rot': item.endRot,
                                '--scale': item.scale,
                                animation: `throw-item ${item.duration} cubic-bezier(0.2, 0.8, 0.2, 1) ${item.delay} forwards, float-item 4s ease-in-out calc(${item.delay} + ${item.duration}) infinite alternate`
                            }}
                        >
                            <div className="opacity-0 drop-shadow-lg" style={{ animation: `fade-in-item ${item.duration} ease-out ${item.delay} forwards` }}>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Animated Cyber Rings */}
                <div className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                    {/* Ring 1 - Dashed Slow Spin */}
                    <svg className="absolute inset-0 w-full h-full text-primary opacity-20" viewBox="0 0 100 100" style={{ animation: 'spin-slow 12s linear infinite' }}>
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
                    </svg>

                    {/* Ring 2 - Solid Dynamic Dashing */}
                    <svg className="absolute inset-0 w-full h-full text-primary opacity-60" viewBox="0 0 100 100" style={{ animation: 'spin-slow-reverse 8s linear infinite' }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ animation: 'dash 4s ease-in-out infinite' }} />
                    </svg>

                    {/* Ring 3 - Inner Accents */}
                    <svg className="absolute inset-0 w-full h-full text-white opacity-10" viewBox="0 0 100 100" style={{ animation: 'spin-slow 6s linear infinite' }}>
                        <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 10 5 10" />
                    </svg>

                    {/* Deep Central Ambient Glow */}
                    <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full scale-150"></div>

                    {/* Typography Group */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <p className="text-white/60 font-display text-xs md:text-sm tracking-[0.5em] uppercase mb-4 opacity-0 drop-shadow-md" style={{ animation: 'fade-in-up 1s ease-out 0.5s forwards' }}>
                            Welcome to
                        </p>

                        <h1
                            className="text-5xl md:text-7xl font-heading font-bold uppercase text-transparent bg-clip-text px-4 drop-shadow-2xl"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #111 0%, #ef5401 25%, #ffb84d 45%, #ffffff 50%, #ffb84d 55%, #ef5401 75%, #111 100%)',
                                backgroundSize: '200% auto',
                                animation: 'text-reveal 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, shine 2.8s linear infinite'
                            }}
                        >
                            Shopify
                        </h1>

                        {/* Chic bottom accent line */}
                        <div className="mt-6 flex gap-1 opacity-0" style={{ animation: 'fade-in-up 1s ease-out 1.2s forwards' }}>
                            <div className="w-2 h-1 bg-primary/80 rounded-full animate-pulse"></div>
                            <div className="w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(239,84,1,0.8)]"></div>
                            <div className="w-2 h-1 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
