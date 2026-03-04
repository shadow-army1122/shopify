import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InteractiveBackground from '@/Components/InteractiveBackground';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer', // Hardcode to buyer for storefront registration
        address_line_1: '',
        city: '',
        state: '',
        postal_code: '',
        phone: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-background-light font-display relative overflow-hidden flex items-center justify-center p-4 py-12">
            <InteractiveBackground />

            <Head title="Create Account | Shopify" />

            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="block h-12 group">
                    <img src="/images/logo.png" alt="Company Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Main Auth Card */}
                <div className="glass-panel rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -ml-10"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mb-10 -mr-10"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Join Shopify</h1>
                            <p className="text-slate-500">Create an account for faster checkout.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Full Name</label>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                    autoComplete="name"
                                    isFocused={true}
                                    placeholder="Jane Doe"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Email Address</label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                    autoComplete="username"
                                    placeholder="jane@example.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Password</label>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Confirm</label>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                            </div>

                            <hr className="border-primary/20 my-4" />
                            <h3 className="text-lg font-bold text-slate-800">Shipping Details</h3>

                            <div>
                                <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Street Address</label>
                                <TextInput
                                    id="address_line_1"
                                    name="address_line_1"
                                    value={data.address_line_1}
                                    className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                    autoComplete="street-address"
                                    placeholder="123 Commerce St"
                                    onChange={(e) => setData('address_line_1', e.target.value)}
                                    required
                                />
                                <InputError message={errors.address_line_1} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">City</label>
                                    <TextInput
                                        id="city"
                                        name="city"
                                        value={data.city}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="address-level2"
                                        placeholder="Silicon Valley"
                                        onChange={(e) => setData('city', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.city} className="mt-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">State/Province</label>
                                    <TextInput
                                        id="state"
                                        name="state"
                                        value={data.state}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="address-level1"
                                        placeholder="CA"
                                        onChange={(e) => setData('state', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.state} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Postal Code</label>
                                    <TextInput
                                        id="postal_code"
                                        name="postal_code"
                                        value={data.postal_code}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="postal-code"
                                        placeholder="94025"
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.postal_code} className="mt-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium border-b border-primary/20 pb-1 mb-2 text-slate-700">Phone Number</label>
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                        autoComplete="tel"
                                        placeholder="(555) 123-4567"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 mt-6 flex items-center justify-center gap-2 group"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                                {!processing && <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">person_add</span>}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500 flex flex-col gap-2">
                            <div>
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary font-bold hover:underline">
                                    Sign In
                                </Link>
                            </div>
                            <div>
                                Want to sell on Shopify?{' '}
                                <Link href="/seller/register" className="text-primary font-bold hover:underline">
                                    Register as a Seller
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs mt-8 pb-8">
                    By creating an account, you agree to our Terms of Service & Privacy Policy.<br />
                    &copy; {new Date().getFullYear()} Shopify App. All rights reserved.
                </p>
            </div>
        </div>
    );
}
