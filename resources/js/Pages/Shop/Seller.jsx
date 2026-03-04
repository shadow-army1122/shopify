import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';

export default function Seller({ shop, products }) {
    return (
        <StorefrontLayout>
            <Head title={`${shop.shop_name} Shop`} />

            {/* Shop Header */}
            <div className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <span className="material-icons text-4xl text-white">storefront</span>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-heading font-bold">{shop.shop_name}</h1>
                                {shop.is_verified ? (
                                    <span className="material-icons text-blue-400 text-2xl" title="Verified Seller">verified</span>
                                ) : null}
                            </div>
                            <p className="text-slate-300 max-w-2xl">{shop.description || 'Welcome to our shop! Check out our latest products below.'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Products</h2>
                    <span className="text-slate-500">{products.total} items</span>
                </div>

                {products.data && products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {products.data.map((product, index) => (
                                <div key={product.id} className="glass-panel rounded-lg p-4 group hover:-translate-y-1 transition-transform duration-300 border border-slate-100 shadow-sm">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 mb-4 cursor-pointer">
                                        <Link href={`/product/${product.slug}`}>
                                            <img
                                                src={product.image_url || `https://placehold.co/600x800/f8f8f8/e5e5e5?text=${encodeURIComponent(product.name)}`}
                                                alt={product.name}
                                                className="w-full h-full object-contain object-center mix-blend-multiply transition-transform duration-500 group-hover:scale-105 p-4"
                                            />
                                        </Link>

                                        {/* Hover Overlay with Add to Cart */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none flex justify-center">
                                            <Link
                                                href={`/cart/add/${product.id}`}
                                                method="post"
                                                data={{ quantity: 1 }}
                                                onSuccess={() => router.visit('/checkout')}
                                                className="w-[90%] bg-slate-900 text-white font-medium py-2.5 rounded-full shadow-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                                            >
                                                <span className="material-icons text-sm">shopping_cart</span>
                                                Add to Cart
                                            </Link>
                                        </div>

                                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 cursor-pointer">
                                            <span className="material-icons text-sm">favorite</span>
                                        </button>
                                    </div>
                                    <div className="space-y-1 mt-4">
                                        <p className="text-xs font-semibold text-primary uppercase">{product.category?.name || 'Product'}</p>
                                        <h3 className="font-heading font-bold text-slate-800 text-lg ">
                                            <Link className="truncate max-w-full block hover:text-primary transition-colors" href={`/product/${product.slug}`}>{product.name}</Link>
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-slate-900">${Number(product.price).toLocaleString()}</span>
                                            <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                                                <span className="material-icons text-sm">star</span>
                                                4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="mt-12 flex justify-center flex-wrap gap-2">
                            {products.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${link.active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-md text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: link.label }}></span>
                                )
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="material-icons text-6xl text-slate-300 mb-4 block">inventory_2</span>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
                        <p className="text-slate-500">This seller hasn't listed any active products yet.</p>
                        <Link href="/" className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-primary transition-all">
                            Back to Store
                        </Link>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
