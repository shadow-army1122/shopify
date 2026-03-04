import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CategoryCombobox from '@/Components/CategoryCombobox';

export default function Edit({ auth, product }) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: product.name || '',
        category_id: product.category_id || '',
        price: product.price || '',
        stock: product.stock || '',
        details: product.details || '',
        is_active: product.is_active || false,
        image: null,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('products.destroy', product.id));
        }
    };

    return (
        <SellerLayout
            header={<span className="text-slate-800">Edit Product - {product.name}</span>}
        >
            <Head title={`Edit Product - ${product.name}`} />

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
                                        autoFocus
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
                                    {product.image_url && (
                                        <div className="mb-2 mt-1">
                                            {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                            <img src={product.image_url} alt="Product" className="w-full h-32 object-contain object-center mix-blend-multiply rounded-md shadow-sm border border-gray-200" />
                                        </div>
                                    )}
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                {/* Active Status */}
                                <div className="block mt-4">
                                    <label htmlFor="is_active" className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Active (Visible in store)</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Update Product
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* Separate Delete Section */}
                            <div className="mt-6 border-t pt-6 max-w-xl">
                                <button
                                    onClick={handleDelete}
                                    className="text-red-600 hover:text-red-900 font-semibold text-sm transition-colors"
                                >
                                    Delete Product permanently
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
