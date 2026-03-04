import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function PaymentMethods({ auth, paymentMethods }) {
    const [isAdding, setIsAdding] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name,
        card_number: '',
        expiry: '',
        cvv: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/buyer/payment-methods', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsAdding(false);
            }
        });
    };

    const deleteMethod = (id) => {
        if (confirm('Are you sure you want to remove this payment method?')) {
            router.delete(`/buyer/payment-methods/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Payment Methods</h2>}
        >
            <Head title="Payment Methods" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-slate-900">Your Saved Cards</h3>
                                <p className="text-slate-500 text-sm mt-1">Manage your payment methods for faster checkout.</p>
                            </div>
                            {!isAdding && (
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                                >
                                    <span className="material-icons text-sm">add</span> New Card
                                </button>
                            )}
                        </div>

                        {/* Add New Card Form */}
                        {isAdding && (
                            <div className="mb-10 bg-slate-50 border border-slate-200 p-6 rounded-2xl animate-fade-in-up">
                                <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                                    <h4 className="font-bold text-slate-800 text-lg">Add Payment Method</h4>
                                    <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                                        <span className="material-icons">close</span>
                                    </button>
                                </div>

                                <form onSubmit={submit} className="space-y-5 flex flex-col">
                                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-2 flex items-start gap-3 border border-blue-200">
                                        <span className="material-icons text-blue-500">info</span>
                                        <p>This is a simulated storefront. Any 15-19 digit number will work. No real transactions are processed.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Name on Card</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Jane Doe"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            value={data.card_number}
                                            onChange={e => setData('card_number', e.target.value)}
                                            className="w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
                                            placeholder="0000 0000 0000 0000"
                                            required
                                        />
                                        {errors.card_number && <p className="text-red-500 text-sm mt-1">{errors.card_number}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                value={data.expiry}
                                                onChange={e => setData('expiry', e.target.value)}
                                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
                                                placeholder="MM/YY"
                                                required
                                            />
                                            {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                value={data.cvv}
                                                onChange={e => setData('cvv', e.target.value)}
                                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
                                                placeholder="123"
                                                required
                                            />
                                            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors disabled:opacity-50"
                                        >
                                            {processing ? 'Saving...' : 'Save Card'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* List Existing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paymentMethods && paymentMethods.length > 0 ? (
                                paymentMethods.map((method) => (
                                    <div key={method.id} className="border border-slate-200 rounded-2xl p-6 relative group hover:border-primary/50 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                                        {method.is_default && (
                                            <span className="absolute -top-3 left-6 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">Primary</span>
                                        )}

                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-16 h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                                                {method.brand === 'Visa' ? 'VISA' : (method.brand === 'MasterCard' ? 'MC' : method.brand.toUpperCase().substring(0, 4))}
                                            </div>
                                            <button
                                                onClick={() => deleteMethod(method.id)}
                                                className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                title="Remove Card"
                                            >
                                                <span className="material-icons text-sm">delete</span>
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="font-mono text-xl tracking-widest text-slate-800">
                                                •••• {method.last4}
                                            </div>
                                            <div className="flex justify-between text-sm text-slate-500">
                                                <span>Exp: {String(method.expiry_month).padStart(2, '0')}/{String(method.expiry_year).substring(2)}</span>
                                                <span className="uppercase text-xs">{method.brand}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                !isAdding && (
                                    <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-3xl">
                                        <span className="material-icons text-4xl mb-3 text-slate-300">credit_card_off</span>
                                        <p>You don't have any payment methods saved.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
