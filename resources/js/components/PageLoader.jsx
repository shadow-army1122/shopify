import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function PageLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let navTimeout;
        const removeStartListener = router.on('start', () => {
            setLoading(true);
        });

        const removeFinishListener = router.on('finish', () => {
            // Keep it alive slightly longer to show the animation finishing gracefully
            navTimeout = setTimeout(() => {
                setLoading(false);
            }, 600);
        });

        return () => {
            clearTimeout(navTimeout);
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/40 backdrop-blur-[8px] transition-opacity duration-500">
            {/* Minimalist Ripple Loader */}
            <div className="relative flex items-center justify-center">
                {/* Outer Ripple 1 */}
                <div className="absolute w-24 h-24 bg-primary/20 rounded-full animate-ping shadow-[0_0_15px_rgba(239,84,1,0.2)]" style={{ animationDuration: '1.5s' }}></div>

                {/* Outer Ripple 2 (Delayed) */}
                <div className="absolute w-20 h-20 bg-primary/30 rounded-full animate-ping shadow-[0_0_20px_rgba(239,84,1,0.4)]" style={{ animationDuration: '1.5s', animationDelay: '0.4s' }}></div>

                {/* Inner Core Circle */}
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/60">
                    <span className="font-heading font-bold text-2xl text-white">S</span>
                </div>
            </div>

            {/* Subtle Text */}
            <div className="mt-8 opacity-70 animate-pulse">
                <span className="text-slate-600 font-heading font-semibold text-sm tracking-widest uppercase">
                    Loading
                </span>
            </div>
        </div>
    );
}
