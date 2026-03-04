import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import OrderTrackingTimeline from '@/Components/OrderTrackingTimeline';

export default function Show({ auth, order }) {

    const { data, setData, put, processing, errors } = useForm({
        status: order.status || 'pending_payment',
        tracking_id: order.tracking_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('seller.orders.update', order.id));
    };

    return (
        <SellerLayout
            header={<span className="text-slate-800">Order #{order.id}</span>}
        >
            <Head title={`Order #${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <Link href={route('seller.orders.index')} className="text-sm text-indigo-600 hover:text-indigo-900 font-semibold flex items-center gap-1">
                            <span className="material-icons text-sm">arrow_back</span> Back to Orders
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Order Details */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Order Details</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong className="text-gray-700">Customer:</strong> {order.user?.name} ({order.user?.email})</p>
                                <p><strong className="text-gray-700">Date:</strong> {new Date(order.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong className="text-gray-700">Status:</strong> <span className="capitalize">{order.status.replace('_', ' ')}</span></p>
                                <p><strong className="text-gray-700">Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                            </div>

                            {order.tracking_id && (
                                <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                                    <strong className="text-gray-700">Tracking ID:</strong> <span className="font-mono">{order.tracking_id}</span>
                                </div>
                            )}

                            <h4 className="font-bold mt-8 mb-4 border-b pb-2 text-gray-800">Items Ordered</h4>
                            <ul className="divide-y divide-gray-100">
                                {order.items?.map((item) => (
                                    <li key={item.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <span className="block font-bold text-gray-900">{item.product?.name || 'Unknown Product'}</span>
                                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="font-medium text-gray-900">${parseFloat(item.price).toFixed(2)}</span>
                                    </li>
                                ))}
                                {(!order.items || order.items.length === 0) && (
                                    <li className="py-3 text-sm text-gray-500">No items found for this order.</li>
                                )}
                            </ul>

                            <h4 className="font-bold mt-8 mb-4 border-b pb-2 text-gray-800">Tracking Timeline</h4>
                            <div className="bg-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-100">
                                <OrderTrackingTimeline
                                    status={order.status}
                                    createdAt={order.created_at}
                                    updatedAt={order.updated_at}
                                />
                            </div>
                        </div>

                        {/* Update Status Form */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 h-fit">
                            <h3 className="text-lg font-bold mb-6">Update Order Fulfillment</h3>

                            <form onSubmit={submit} className="space-y-6">

                                {/* Status */}
                                <div>
                                    <InputLabel htmlFor="status" value="Order Status" />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="pending_payment">Pending Payment</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Tracking ID */}
                                <div>
                                    <InputLabel htmlFor="tracking_id" value="Tracking ID / Courier URL" />
                                    <TextInput
                                        id="tracking_id"
                                        className="block mt-1 w-full"
                                        type="text"
                                        name="tracking_id"
                                        value={data.tracking_id}
                                        onChange={(e) => setData('tracking_id', e.target.value)}
                                        placeholder="e.g. FEDEX-123456789 (Optional)"
                                    />
                                    <InputError message={errors.tracking_id} className="mt-2" />
                                    <p className="text-xs text-gray-500 mt-1">Provide tracking info if status is set to Shipped.</p>
                                </div>

                                <div className="pt-2">
                                    <PrimaryButton disabled={processing} className="w-full justify-center">
                                        Update Order Status
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
