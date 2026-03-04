import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ commission, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        commission_percentage: commission || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Global Settings" />

            <div className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Marketplace Settings</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center shadow-sm">
                        <span className="material-icons mr-2 text-green-500">check_circle</span>
                        <div className="text-sm font-medium">{flash.success}</div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl">
                    <div className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Financial Settings</h2>

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="commission_percentage" value="Platform Commission Percentage (%)" />
                                <div className="text-sm text-slate-500 mb-2">
                                    Set the percentage the platform takes from each successful seller order.
                                </div>
                                <TextInput
                                    id="commission_percentage"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    name="commission_percentage"
                                    value={data.commission_percentage}
                                    className="block mt-1 w-full max-w-sm"
                                    onChange={(e) => setData('commission_percentage', e.target.value)}
                                />
                                <InputError message={errors.commission_percentage} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-start mt-6 pt-6 border-t border-slate-100">
                                <PrimaryButton disabled={processing} className="bg-primary hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700">
                                    Save Settings
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
