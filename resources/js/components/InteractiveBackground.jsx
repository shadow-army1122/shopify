import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let animationFrameId;
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(width * 0.05, 100); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    color: `rgba(19, 127, 236, ${Math.random() * 0.3})` // Primary color
                });
            }
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Mouse follower gradient (Subtle for Light Theme)
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
            gradient.addColorStop(0, 'rgba(19, 127, 236, 0.08)'); // Reduced opacity
            gradient.addColorStop(1, 'rgba(19, 127, 236, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // 2. Ambient drifting light (Subtle)
            const time = Date.now() * 0.0005;
            const x2 = width * 0.5 + Math.sin(time) * 300;
            const y2 = height * 0.5 + Math.cos(time * 0.8) * 200;
            const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 600);
            gradient2.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
            gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, width, height);

            // 3. Particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (200 - distance) / 200;
                    p.vx += forceDirectionX * force * 0.05;
                    p.vy += forceDirectionY * force * 0.05;
                }

                // Drag/Friction to stabilize
                p.vx *= 0.99;
                p.vy *= 0.99;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        mouseX = width / 2;
        mouseY = height / 2;
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
