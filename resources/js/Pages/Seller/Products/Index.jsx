import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Index({ auth, products }) {

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('products.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <SellerLayout
            header={<span className="text-slate-800">My Products</span>}
        >
            <Head title="My Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* Header Actions */}
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-display font-bold text-gray-900">My Collection</h3>
                                <Link
                                    href={route('products.create')}
                                    className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <span className="text-xl leading-none">+</span> Add Product
                                </Link>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.data.map((product) => (
                                    <div key={product.id} className="group relative rounded-[40px] overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2">

                                        {/* Image Area */}
                                        <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                                            {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                            <img
                                                src={product.image_url || `https://placehold.co/600x450/f3f4f6/a1a1aa?text=${encodeURIComponent(product.name)}`}
                                                alt={product.name}
                                                className="w-full h-full object-contain object-center mix-blend-multiply transition-transform duration-1000 ease-in-out group-hover:scale-110 p-2"
                                            />

                                            {/* Status Badge */}
                                            <div className="absolute top-6 left-6 z-10">
                                                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm backdrop-blur-md ${product.is_active ? 'bg-green-400/90 text-white' : 'bg-red-400/90 text-white'}`}>
                                                    {product.is_active ? 'Active' : 'Hidden'}
                                                </span>
                                            </div>

                                            {/* Actions (Top Right) */}
                                            <div className="absolute top-6 right-6 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                    className="p-3 bg-white/90 backdrop-blur text-gray-700 rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                    </svg>
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-3 bg-white/90 backdrop-blur text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Floating Content Bubble */}
                                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white/50 transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 group-hover:scale-[1.02]">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">
                                                        {product.category?.name || 'Uncategorized'}
                                                    </p>
                                                    <h3 className="text-lg font-display font-bold text-gray-900 leading-tight line-clamp-1" title={product.name}>
                                                        {product.name}
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-lg font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</span>
                                                </div>
                                            </div>

                                            <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : (product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500')}`}></span>
                                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.stock} in stock</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            {/* Pagination (Simple fallback if products.links is not fully mapped yet in this exact view) */}
                            {products.links && products.links.length > 3 && (
                                <div className="mt-12 flex justify-center gap-1">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 border rounded ${link.active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
