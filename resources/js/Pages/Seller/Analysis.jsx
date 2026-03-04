import React from 'react';
import { Head, Link } from '@inertiajs/react';
import SellerLayout from '@/Layouts/SellerLayout';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analysis({ sentimentChartData, productReviewData, globalSentiments, recentNegativeReviews }) {

    // Fallback if no data
    const totalReviews = globalSentiments.positive + globalSentiments.neutral + globalSentiments.negative;

    // Calculate Top Performer (Product with highest percentage of positive reviews, min 1 review)
    const topPerformer = [...productReviewData]
        .filter(p => p.total_reviews > 0)
        .sort((a, b) => (b.positive / b.total_reviews) - (a.positive / a.total_reviews))[0];

    return (
        <SellerLayout>
            <Head title="Review Analysis | Seller Workspace" />

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="font-heading text-4xl font-black text-slate-800 mb-2 tracking-tight">Customer Sentiment</h1>
                        <p className="text-slate-500 font-medium">Analyze how buyers feel about your products based on their reviews.</p>
                    </div>
                    {totalReviews > 0 && (
                        <div className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/60 shadow-xl shadow-slate-200/50 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <span className="material-icons">rate_review</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-0.5">Total Rated</p>
                                <p className="text-2xl font-black text-slate-800 leading-none">{totalReviews}</p>
                            </div>
                        </div>
                    )}
                </div>

                {totalReviews === 0 ? (
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-12 text-center border border-white/60 shadow-xl shadow-slate-200/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                            <span className="material-icons text-4xl text-slate-400">sentiment_dissatisfied</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">No Reviews Yet</h2>
                        <p className="text-slate-500 max-w-md mx-auto">Once your customers start leaving reviews on your products, this dashboard will visualize their sentiments automatically.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Overall Sentiment Pie Chart */}
                            <div className="lg:col-span-1 glass-panel p-6 md:p-8 rounded-3xl animate-fade-in-up hover:-translate-y-1 transition-transform duration-300 hover:shadow-2xl hover:shadow-indigo-200/50" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">pie_chart</span> Overview
                                </h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sentimentChartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                            >
                                                {sentimentChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) => [`${value} Reviews`, 'Count']}
                                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontWeight: '600', color: '#64748b' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Product Breakdown Bar Chart */}
                            <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl animate-fade-in-up hover:-translate-y-1 transition-transform duration-300 hover:shadow-2xl hover:shadow-indigo-200/50" style={{ animationDelay: '0.3s' }}>
                                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">bar_chart</span> Product Breakdown
                                </h3>
                                <div className="h-[300px] w-full">
                                    {/* We filter out products with 0 reviews to keep the chart clean */}
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={productReviewData.filter(p => p.total_reviews > 0)}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#64748b"
                                                tick={{ fill: '#64748b', fontWeight: 600, fontSize: 12 }}
                                                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                                cursor={{ fill: '#f8fafc' }}
                                            />
                                            <Legend wrapperStyle={{ fontWeight: '600' }} />
                                            <Bar dataKey="positive" name="Positive" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                            <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#94a3b8" />
                                            <Bar dataKey="negative" name="Negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="glass-panel rounded-3xl border border-white/60 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div className="p-6 md:p-8 border-b border-slate-100 bg-white/50">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">view_list</span> Details by Product
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse bg-white/60">
                                    <thead>
                                        <tr className="bg-slate-50/80 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                                            <th className="p-4 md:p-6">Product Name</th>
                                            <th className="p-4 md:p-6 text-center">Total Reviews</th>
                                            <th className="p-4 md:p-6 text-center text-emerald-600">Positive</th>
                                            <th className="p-4 md:p-6 text-center text-slate-400">Neutral</th>
                                            <th className="p-4 md:p-6 text-center text-rose-500">Negative</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100/80">
                                        {productReviewData.filter(p => p.total_reviews > 0).map((product) => (
                                            <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="p-4 md:p-6">
                                                    <Link href={`/product/${product.id}`} className="font-bold text-slate-800 hover:text-indigo-600 transition-colors">{product.name}</Link>
                                                </td>
                                                <td className="p-4 md:p-6 text-center font-bold text-slate-600">{product.total_reviews}</td>
                                                <td className="p-4 md:p-6 text-center font-bold text-emerald-500">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {product.positive} <span className="text-xs opacity-50 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md">({Math.round(product.positive / product.total_reviews * 100)}%)</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6 text-center font-bold text-slate-400">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {product.neutral} <span className="text-xs opacity-50 bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded-md">({Math.round(product.neutral / product.total_reviews * 100)}%)</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 md:p-6 text-center font-bold text-rose-500">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {product.negative} <span className="text-xs opacity-50 bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-md">({Math.round(product.negative / product.total_reviews * 100)}%)</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Top Performer Spotlight */}
                        {topPerformer && topPerformer.positive > 0 && (
                            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-100/50 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-emerald-500 shrink-0 shadow-lg shadow-emerald-200/50">
                                            <span className="material-icons text-3xl">workspace_premium</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-1">
                                                Top Rated Product
                                            </h3>
                                            <p className="text-slate-600 font-medium text-sm">Customers are loving this item with a <strong className="text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md">{Math.round(topPerformer.positive / topPerformer.total_reviews * 100)}%</strong> positive sentiment rate.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-100/50 flex items-center gap-4 shrink-0 w-full md:w-auto shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Product</span>
                                            <Link href={`/product/${topPerformer.id}`} className="font-black text-slate-800 hover:text-emerald-600 transition-colors text-lg">
                                                {topPerformer.name}
                                            </Link>
                                        </div>
                                        <div className="w-px h-10 bg-slate-200 mx-2"></div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Positives</span>
                                            <span className="font-black text-emerald-500 text-lg">{topPerformer.positive}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actionable Insights: Recent Negative Reviews */}
                        {recentNegativeReviews && recentNegativeReviews.length > 0 && (
                            <div className="bg-gradient-to-br from-rose-50/80 to-white/50 border border-rose-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-black text-rose-600 flex items-center gap-2">
                                        <span className="material-icons">warning_amber</span> Actionable Feedback
                                    </h3>
                                    <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-100 px-3 py-1 rounded-full">Needs Attention</span>
                                </div>
                                <div className="grid gap-4">
                                    {recentNegativeReviews.map((review) => (
                                        <div key={review.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all group">
                                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shrink-0">
                                                        {review.user?.avatar ? (
                                                            <img src={review.user.avatar} alt="User" className="w-full h-full object-cover" />
                                                        ) : (
                                                            (review.user?.name || '?').charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800 text-sm">{review.user?.name || 'Customer'}</h4>
                                                        <div className="flex items-center">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span key={star} className={`material-icons text-[12px] ${star <= review.rating ? 'text-amber-400' : 'text-slate-200'}`}>
                                                                    {star <= review.rating ? 'star' : 'star_border'}
                                                                </span>
                                                            ))}
                                                            <span className="text-[10px] text-slate-400 ml-2 font-medium">{new Date(review.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link href={`/product/${review.product?.slug || review.product?.id}`} className="px-4 py-1.5 rounded-full bg-slate-50 text-xs text-slate-600 font-bold hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-200">
                                                    {review.product?.name}
                                                </Link>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium italic mt-2">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </SellerLayout>
    );
}
