import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CategoryCombobox from '@/Components/CategoryCombobox';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        price: '',
        stock: '',
        details: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <SellerLayout
            header={<span className="text-slate-800">Add New Product</span>}
        >
            <Head title="Add New Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="mb-6">
                                <Link href={route('products.index')} className="text-sm text-indigo-600 hover:text-indigo-900 font-semibold flex items-center gap-1">
                                    <span className="material-icons text-sm">arrow_back</span> Back to Products
                                </Link>
                            </div>

                            <form onSubmit={submit} className="max-w-xl">

                                {/* Name */}
                                <div>
                                    <InputLabel htmlFor="name" value="Product Name" />
                                    <TextInput
                                        id="name"
                                        className="block mt-1 w-full"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused={true}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Category */}
                                <div className="mt-4 shrink-0 relative z-50">
                                    <InputLabel htmlFor="category_id" value="Category" />
                                    <CategoryCombobox
                                        value={data.category_id}
                                        onChange={(val) => setData('category_id', val)}
                                    />
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>

                                {/* Price */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price ($)" />
                                    <TextInput
                                        id="price"
                                        className="block mt-1 w-full"
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                {/* Stock */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="stock" value="Stock Quantity" />
                                    <TextInput
                                        id="stock"
                                        className="block mt-1 w-full"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>

                                {/* Details */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="details" value="Product Details" />
                                    <textarea
                                        id="details"
                                        name="details"
                                        value={data.details}
                                        onChange={(e) => setData('details', e.target.value)}
                                        className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                    />
                                    <InputError message={errors.details} className="mt-2" />
                                </div>

                                {/* Image */}
                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <InputLabel htmlFor="image" value="Product Image" />
                                    <div className="mt-2 text-sm text-gray-500 mb-2">
                                        For best results, upload an image with a <strong>4:5 aspect ratio</strong> (e.g., 800x1000 pixels).
                                        This ensures your product looks perfect on the detail page!
                                    </div>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Create Product
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
