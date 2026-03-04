import React, { useEffect, useRef, useState } from 'react';

export default function IntroLoader({ onFinish }) {
    const canvasRef = useRef(null);
    const [opacity, setOpacity] = useState(1);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let particles = [];
        const particleCount = 150;
        let animationFrameId;
        let frame = 0;
        const centerX = width / 2;
        const centerY = height / 2;

        // Initialize particles at random edge positions
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.max(width, height) * 0.8;
            particles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                tx: centerX,
                ty: centerY,
                speed: 0.05 + Math.random() * 0.05,
                color: `rgba(19, 127, 236, ${0.5 + Math.random() * 0.5})`,
                size: 2 + Math.random() * 3,
                angle: angle
            });
        }

        const animate = () => {
            frame++;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails effect
            ctx.fillRect(0, 0, width, height);

            let allConverged = true;

            particles.forEach(p => {
                // Phase 1: Convergence
                if (frame < 100) {
                    p.x += (p.tx - p.x) * p.speed;
                    p.y += (p.ty - p.y) * p.speed;
                    const dist = Math.sqrt((p.x - p.tx) ** 2 + (p.y - p.ty) ** 2);
                    if (dist > 5) allConverged = false;
                }
                // Phase 2: Swirl/Pulse
                else if (frame < 180) {
                    const radius = 20 + Math.sin(frame * 0.2) * 10;
                    p.x = centerX + Math.cos(p.angle + frame * 0.1) * radius;
                    p.y = centerY + Math.sin(p.angle + frame * 0.1) * radius;
                }
                // Phase 3: Explosion
                else {
                    const dist = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
                    p.x += Math.cos(p.angle) * (dist * 0.1 + 5); // Accelerate out
                    p.y += Math.sin(p.angle) * (dist * 0.1 + 5);
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            // Trigger text reveal
            if (frame === 100) {
                setTextVisible(true);
            }

            // End animation
            if (frame > 220) {
                setOpacity(0);
                setTimeout(onFinish, 700); // Matches transition duration
                cancelAnimationFrame(animationFrameId);
                return;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[10001] bg-black flex items-center justify-center transition-opacity duration-700 pointer-events-none"
            style={{ opacity }}
        >
            <canvas ref={canvasRef} className="absolute inset-0" />

            <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 transform ${textVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-lg'}`}>
                {/* Logo with Glow */}
                <div className="w-24 h-24 mb-6 rounded-full bg-white p-1 shadow-[0_0_50px_rgba(19,127,236,0.6)]">
                    <img src="/images/Tall-E.png" alt="Tall-E" className="w-full h-full object-cover rounded-full" />
                </div>

                <h1 className="text-5xl font-heading font-bold text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    Tall-E
                </h1>
                <p className="text-blue-400 font-medium tracking-[0.5em] text-sm mt-3 uppercase animate-pulse">
                    Marketplace AI
                </p>
            </div>
        </div>
    );
}
