import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import StorefrontLayout from '@/Layouts/StorefrontLayout';

export default function Index({ products, categories }) {
    const { data, get, processing } = useForm({
        search: new URLSearchParams(window.location.search).get('search') || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get('/', { preserveState: true });
    };

    const mascotPhrases = [
        "What's up, bud?",
        "Wanna buy something?",
        "Looking for a deal?",
        "Check out these items!",
        "Stay fresh, shop smart.",
        "Need some help?",
        "Everything looks good today!"
    ];
    const [currentPhrase, setCurrentPhrase] = useState(mascotPhrases[0]);
    const [isMascotHovered, setIsMascotHovered] = useState(false);

    useEffect(() => {
        if (isMascotHovered) {
            setCurrentPhrase(mascotPhrases[Math.floor(Math.random() * mascotPhrases.length)]);
        }
    }, [isMascotHovered]);

    return (
        <StorefrontLayout>
            <Head title="Home" />

            {/* Bento Grid Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                {/* Main Promo */}
                <div className="md:col-span-2 md:row-span-2 glass-panel rounded-lg relative overflow-hidden group transition-all hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    <img alt="Stylish fashion hero"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="/assets/hero-banner.jpg" />
                    <div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3 w-max">New Season</span>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">Next-Gen Shopping <br />Is Here.</h1>
                        <p className="text-white/90 mb-6 max-w-md">Experience AI-curated collections tailored just for you. Sustainable, stylish, and smart.</p>
                        <a href="#collection" className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors w-max shadow-lg flex items-center gap-2">
                            Explore Collection <span className="material-icons text-sm">arrow_forward</span>
                        </a>
                    </div>
                </div>

                {/* AI Pick */}
                <div className="md:col-span-1 md:row-span-2 glass-panel-darker rounded-lg p-6 flex flex-col items-center justify-between text-center group hover:border-primary/30 transition-all">
                    <div className="w-full flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">AI Pick for You</span>
                        <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-icons">favorite_border</span></button>
                    </div>
                    <div className="relative w-40 h-40 my-4">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                        <img alt="Headphones Product"
                            className="relative z-10 w-full h-full object-contain mix-blend-multiply transform group-hover:-translate-y-2 transition-transform duration-300"
                            src="/assets/sonyearbuds.jpg" />
                    </div>
                    <div>
                        <h3 className="font-heading text-xl font-bold text-slate-800 mb-1">Sonic X-Pro</h3>
                        <p className="text-sm text-slate-500 mb-3">Noise Cancelling Wireless</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg font-bold text-slate-900">$249</span>
                            <span className="text-sm text-slate-400 line-through">$320</span>
                        </div>
                    </div>
                    <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-full font-medium hover:bg-primary transition-colors flex items-center justify-center gap-2">
                        Add to Cart
                    </button>
                </div>

                {/* Category Tile */}
                <Link href="/?category=home-living" className="md:col-span-1 md:row-span-1 glass-panel rounded-lg p-6 relative group hover:bg-white/80 transition-all cursor-pointer block mt-16 pt-12 md:mt-0 md:pt-6">
                    {/* Mascot Container - positioned absolutely and interactive */}
                    <div
                        className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-48 z-40 cursor-help"
                        onMouseEnter={() => setIsMascotHovered(true)}
                        onMouseLeave={() => setIsMascotHovered(false)}
                    >
                        <img alt="Fire Mascot"
                            className={`w-full h-full object-contain transition-all duration-300 pointer-events-none -scale-x-100 ${isMascotHovered ? 'drop-shadow-[0_0_15px_rgba(251,146,60,0.8)] -translate-y-2' : ''}`}
                            src="/images/mascot_sleeping_buddha_posepng.png"
                        />

                        {/* Comic Speech Bubble */}
                        <div className={`absolute top-12 left-40 bg-white border-2 border-orange-400 text-slate-800 text-sm font-bold font-heading px-4 py-2 rounded-2xl shadow-xl transition-all duration-300 w-max max-w-[150px] text-center pointer-events-none transform origin-left ${isMascotHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`}>
                            {currentPhrase}
                            {/* Speech Bubble Tail */}
                            <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-white border-b-2 border-l-2 border-orange-400 transform rotate-45"></div>
                        </div>
                    </div>

                    {/* Background decoration with overflow-hidden nested to allow mascot overflow */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                        {/* The orange circle */}
                        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-orange-100/80 rounded-full z-0 group-hover:scale-110 transition-transform duration-500"></div>

                        {/* The vase image, positioned to overlap the circle perfectly */}
                        <img alt="Home Vase"
                            className="absolute bottom-2 right-2 w-28 h-28 object-cover rounded shadow-sm z-10 group-hover:-translate-y-1 transition-transform duration-500 pointer-events-none"
                            src="/assets/category-home.jpg" />
                    </div>

                    <div className="relative z-10 pointer-events-none">
                        <h3 className="font-heading text-2xl font-bold text-slate-800 mb-1 pointer-events-auto">Home &amp; <br />Living</h3>
                        <span className="text-sm text-slate-500 font-medium pointer-events-auto">1.2k Items</span>
                    </div>
                </Link>

                {/* Flash Sale */}
                <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-primary to-primary-dark rounded-lg p-6 text-white relative overflow-hidden shadow-lg group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-lg"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-icons text-yellow-300 text-sm">bolt</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-white/80">Flash Deal</span>
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-1">Save 40%</h3>
                            <p className="text-sm text-white/80">Ends in 04:23:12</p>
                        </div>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-full text-sm font-semibold transition-colors text-left w-max flex items-center gap-2">
                            Shop Deals <span className="material-icons text-xs">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="max-w-3xl mx-auto text-center relative z-20 mt-16">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-slate-800 mb-6">What can <span className="text-primary">Shopify</span> find for you today?</h2>
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <form onSubmit={handleSearch} className="relative glass-panel rounded-full p-2 flex items-center shadow-lg hover:shadow-xl transition-shadow">
                        <span className="material-icons text-slate-400 pl-4">search</span>
                        <input
                            value={data.search}
                            onChange={e => data.search = e.target.value}
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 h-12 text-lg outline-none px-4"
                            placeholder="Ask for 'Red vintage sneakers' or 'Modern desk lamps'..."
                            type="text"
                        />
                        <button type="button" className="p-3 text-slate-400 hover:text-primary transition-colors border-l border-slate-200">
                            <span className="material-icons">mic</span>
                        </button>
                        <button type="submit" disabled={processing} className="bg-primary hover:bg-primary-dark text-white px-6 h-12 rounded-full font-medium transition-colors ml-2 shadow-md flex items-center justify-center">
                            Search
                        </button>
                    </form>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {['Sneakers', 'Minimalist Watch', 'Gaming Gear', 'Sustainable'].map(chip => (
                        <Link key={chip} href={`/?search=${chip}`} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-colors shadow-sm">
                            {chip}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section id="collection" className="mt-16">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h2 className="font-heading text-2xl font-bold text-slate-800 capitalize">
                        {new URLSearchParams(window.location.search).get('search')
                            ? `Results for "${new URLSearchParams(window.location.search).get('search')}"`
                            : new URLSearchParams(window.location.search).get('category')
                                ? `${new URLSearchParams(window.location.search).get('category').replace('-', ' ')} Collection`
                                : 'Trending Now'
                        }
                    </h2>
                    <Link href="/" className="text-primary font-medium hover:underline flex items-center gap-1">
                        View All <span className="material-icons text-sm">arrow_forward</span>
                    </Link>
                </div>

                {products.data && products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.data.map((product, index) => (
                                <div key={product.id} className="glass-panel rounded-lg p-4 group hover:-translate-y-1 transition-transform duration-300">
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 mb-4 cursor-pointer">
                                        <Link href={`/product/${product.slug}`}>
                                            {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
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

                                        {index < 2 && (
                                            <span className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-white text-[10px] font-bold uppercase rounded-md shadow-sm">Best Seller</span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-primary uppercase">{product.category?.name || 'Product'}</p>
                                        <h3 className="font-heading font-bold text-slate-800 text-lg truncate group-hover:text-primary transition-colors">
                                            <Link href={`/product/${product.slug}`}>{product.name}</Link>
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-slate-900">${Number(product.price).toLocaleString()}</span>
                                            <div className="flex items-center text-yellow-500 text-xs">
                                                <span className="material-icons text-sm">star</span>
                                                4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            {products.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${link.active ? 'bg-primary text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span key={i} className="px-4 py-2 text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: link.label }}></span>
                                )
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 glass-panel rounded-lg">
                        <span className="material-icons text-6xl text-slate-300 mb-4">search_off</span>
                        <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
                        <Link href="/" className="mt-4 inline-block text-primary font-bold hover:underline">Clear Filters</Link>
                    </div>
                )}
            </section>
        </StorefrontLayout>
    );
}
