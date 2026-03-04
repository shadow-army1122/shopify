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
                    `}
                </style>

                {/* Animated Cyber Rings */}
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
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
                            className="text-5xl md:text-7xl font-heading font-bold uppercase text-transparent bg-clip-text px-4"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #555 0%, #ef5401 25%, #ffffff 50%, #ef5401 75%, #555 100%)',
                                backgroundSize: '200% auto',
                                animation: 'text-reveal 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, shine 4s linear infinite'
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
