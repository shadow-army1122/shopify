import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                "primary": "#ef5401",
                "primary-light": "#ff7c33",
                "primary-dark": "#b83f00",
                "background-light": "#f6f7f8",
                "background-dark": "#101922",
                primary: {
                    DEFAULT: '#ef5401',
                    light: '#ff7c33',
                    dark: '#b83f00',
                    50: '#fef5f0',
                    100: '#fdead9',
                    200: '#fbceaf',
                    300: '#f8ac79',
                    400: '#f57e40',
                    500: '#ef5401',
                    600: '#df3c00',
                    700: '#ba2902',
                    800: '#942209',
                    900: '#771e0b',
                    950: '#400c03',
                },
                secondary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                background: {
                    light: '#f6f7f8',
                    dark: '#101922',
                },
                // Dark mode palette (Luxurious Dark)
                luxury: {
                    900: '#0f172a',
                    800: '#1e293b',
                    700: '#334155',
                }
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            animation: {
                'fade-in': 'fadeIn 0.7s ease-out forwards',
                'slide-up': 'slideUp 0.7s ease-out forwards',
                'slide-up-delay': 'slideUp 0.7s ease-out 0.2s forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pop-in': 'popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'bounce-slight': 'bounceSlight 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                popIn: {
                    '0%': { opacity: '0', transform: 'translate(-50%, -50%) scale(0.5)' },
                    '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
                },
                bounceSlight: {
                    '0%, 100%': { transform: 'translateY(-50%)' },
                    '50%': { transform: 'translateY(-55%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'neon': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
            }
        },
    },

    plugins: [forms, typography],
};
