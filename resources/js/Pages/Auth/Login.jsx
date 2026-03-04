import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InteractiveBackground from '@/Components/InteractiveBackground';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-background-light font-display relative overflow-hidden flex items-center justify-center p-4">
            <InteractiveBackground />

            <Head title="Log In | Shopify" />

            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="block h-12 group">
                    <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Main Auth Card */}
                <div className="glass-panel rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mb-10 -ml-10"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                            <p className="text-slate-500">Log in to manage your orders & profile.</p>
                        </div>

                        {status && <div className="mb-6 text-sm font-medium text-green-600 bg-green-50 p-4 rounded-xl border border-green-100">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Email Address</label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Password</label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-slate-300 text-primary focus:ring-primary transition-colors"
                                    />
                                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link href="/forgot-password" className="text-primary hover:underline font-medium">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 mt-4 flex items-center justify-center gap-2 group"
                            >
                                {processing ? 'Signing In...' : 'Sign In'}
                                {!processing && <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Create one now
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Shopify App. All rights reserved.
                </p>
            </div>
        </div>
    );
}
