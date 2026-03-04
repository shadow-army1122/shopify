import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InteractiveBackground from '@/Components/InteractiveBackground';

export default function SellerRegister() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        shop_name: '',
        description: '',
        address_line_1: '',
        city: '',
        state: '',
        postal_code: '',
        phone: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/seller/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-background-light font-display relative overflow-hidden flex items-center justify-center p-4 py-12">
            <InteractiveBackground />

            <Head title="Become a Seller | Shopify" />

            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
                    <span className="font-heading font-bold text-2xl">S</span>
                </Link>
            </div>

            <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
                {/* Main Auth Card */}
                <div className="glass-panel rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -ml-10"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mb-10 -mr-10"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Become a Seller</h1>
                            <p className="text-slate-500">Open your shop and start selling today.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left Column: Personal Info & Shop Info */}
                                <div className="space-y-5">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-primary/20 pb-2">Account Details</h3>

                                    <div>
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                            autoComplete="name"
                                            isFocused={true}
                                            placeholder="Full Name"
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                            autoComplete="username"
                                            placeholder="Email Address"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="new-password"
                                                placeholder="Password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div>
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="new-password"
                                                placeholder="Confirm Pass"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 border-b border-primary/20 pb-2 mt-6">Shop Profile</h3>

                                    <div>
                                        <TextInput
                                            id="shop_name"
                                            name="shop_name"
                                            value={data.shop_name}
                                            className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                            autoComplete="organization"
                                            placeholder="Shop Name"
                                            onChange={(e) => setData('shop_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.shop_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            placeholder="Briefly describe your shop and products..."
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3 shadow-sm min-h-[100px]"
                                            required
                                        ></textarea>
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                </div>

                                {/* Right Column: Address Details */}
                                <div className="space-y-5">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-primary/20 pb-2">Business Address</h3>

                                    <div>
                                        <TextInput
                                            id="address_line_1"
                                            name="address_line_1"
                                            value={data.address_line_1}
                                            className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                            autoComplete="street-address"
                                            placeholder="Street Address"
                                            onChange={(e) => setData('address_line_1', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.address_line_1} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <TextInput
                                                id="city"
                                                name="city"
                                                value={data.city}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="address-level2"
                                                placeholder="City"
                                                onChange={(e) => setData('city', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.city} className="mt-2" />
                                        </div>
                                        <div>
                                            <TextInput
                                                id="state"
                                                name="state"
                                                value={data.state}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="address-level1"
                                                placeholder="State/Prov"
                                                onChange={(e) => setData('state', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.state} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <TextInput
                                                id="postal_code"
                                                name="postal_code"
                                                value={data.postal_code}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="postal-code"
                                                placeholder="ZIP Code"
                                                onChange={(e) => setData('postal_code', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.postal_code} className="mt-2" />
                                        </div>
                                        <div>
                                            <TextInput
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={data.phone}
                                                className="w-full bg-white/50 backdrop-blur-sm border-slate-200 focus:border-primary focus:ring-primary rounded-xl px-4 py-3"
                                                autoComplete="tel"
                                                placeholder="Phone Number"
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 rounded-xl p-4 mt-4 border border-amber-100">
                                        <p className="text-xs text-amber-800 flex items-start gap-2">
                                            <span className="material-icons text-amber-600 text-sm">info</span>
                                            Notice: Upon registration, your seller account will require administrator approval before you can access the dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 mt-8 flex items-center justify-center gap-2 group"
                            >
                                {processing ? 'Submitting Application...' : 'Register as Seller'}
                                {!processing && <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">storefront</span>}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs mt-8 pb-8">
                    By submitting your application, you agree to our Seller Terms & Conditions.<br />
                    &copy; {new Date().getFullYear()} Shopify App. All rights reserved.
                </p>
            </div>
        </div>
    );
}
