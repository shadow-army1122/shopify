import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Index({ auth, totalEarnings, totalWithdrawn, pendingWithdrawal, availableBalance, payouts }) {

    // Setting up the form to request a payout
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.payouts.store'), {
            onSuccess: () => reset('amount'),
            preserveScroll: true,
        });
    };

    return (
        <SellerLayout
            header={<span className="text-slate-800">Payouts & Earnings</span>}
        >
            <Head title="Payouts & Earnings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Financial Snapshot */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[30px] p-8 text-center border border-gray-100">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Earnings</p>
                            <p className="text-4xl font-display font-black text-gray-900 leading-tight">
                                ${parseFloat(totalEarnings).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[30px] p-8 text-center border border-gray-100">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Withdrawn</p>
                            <p className="text-4xl font-display font-black text-gray-900 leading-tight">
                                ${parseFloat(totalWithdrawn).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[30px] p-8 text-center border border-gray-100">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Pending Request</p>
                            <p className="text-4xl font-display font-black text-yellow-500 leading-tight">
                                ${parseFloat(pendingWithdrawal).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[30px] p-8 text-center border border-gray-100">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Available Balance</p>
                            <p className="text-4xl font-display font-black text-green-500 leading-tight">
                                ${parseFloat(availableBalance).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Request Payout */}
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[40px] p-10 border border-gray-100 h-fit">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">Request Payout</h3>

                            {/* Note: Inertia handles success/error via flash messages injected globally or passed via props.
                                We typically handle session flash displaying globally in the Layout, but for direct
                                translation, we would assume usePage().props.flash.success is available.
                                Using page props for flash is standard. We will let the user rely on standard Inertia flash.
                            */}

                            <form onSubmit={submit}>
                                <div className="mb-8">
                                    <InputLabel htmlFor="amount" value="Amount to Withdraw ($)" className="text-gray-600 font-bold mb-2 text-lg block" />
                                    <TextInput
                                        id="amount"
                                        className="block mt-2 w-full rounded-2xl border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-200 bg-gray-50 px-6 py-4 text-xl font-bold"
                                        type="number"
                                        step="0.01"
                                        name="amount"
                                        max={parseFloat(availableBalance)}
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.amount} className="mt-2" />
                                    <p className="text-sm text-gray-400 mt-3 font-medium flex items-center">
                                        <span className="mr-2">ℹ️</span> Maximum available: ${parseFloat(availableBalance).toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={parseFloat(availableBalance) <= 0 || processing || !data.amount}
                                    className="w-full py-4 px-6 bg-gray-900 hover:bg-black text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Processing...' : 'Request Payout'}
                                </button>
                            </form>
                        </div>

                        {/* History */}
                        <div className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[40px] p-10 border border-gray-100 h-full flex flex-col">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">Payout History</h3>

                            <ul className="space-y-4 flex-grow overflow-y-auto max-h-[500px] pr-2">
                                {payouts && payouts.length > 0 ? (
                                    payouts.map((payout) => (
                                        <li key={payout.id} className="p-6 bg-gray-50 rounded-3xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                            <div>
                                                <span className="block text-2xl font-black text-gray-900 mb-1">
                                                    ${parseFloat(payout.amount).toFixed(2)}
                                                </span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    {new Date(payout.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <span className={`px-5 py-2 inline-flex text-xs leading-5 font-black uppercase tracking-widest rounded-full shadow-sm 
                                                ${payout.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 font-medium">No payout history found.</p>
                                    </div>
                                )}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
