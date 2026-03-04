import React, { useState } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Checkout({ cart, total, paymentMethods = [] }) {
    const user = usePage().props.auth.user;
    const cartItems = Object.values(cart || {});

    // Split user name into first and last
    const nameParts = user?.name ? user.name.split(' ') : [];
    const firstName = nameParts.length > 0 ? nameParts[0] : '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        firstName: firstName,
        lastName: lastName,
        address: user?.address_line_1 || '',
        city: user?.city || '',
        country: 'United States',
        postalCode: user?.postal_code || '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [step, setStep] = useState(1); // 1 = Info, 2 = Payment

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        // Posts to CheckoutController@store 
        post('/checkout');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-display flex flex-col md:flex-row">
            <Head title="Checkout | Shopify" />

            {/* Left Column: Forms */}
            <div className="flex-1 px-4 lg:px-24 py-12 lg:py-16 md:overflow-y-auto">
                <Link href="/" className="flex items-center gap-2 mb-10 text-primary transition-transform hover:-translate-x-1 w-max">
                    <span className="material-icons">arrow_back</span>
                    <span className="font-heading font-bold text-lg">Return to Store</span>
                </Link>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-slate-200 text-slate-500'}`}>1</div>
                        <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Information</span>
                    </div>
                    <div className={`flex-1 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-slate-200 text-slate-500'}`}>2</div>
                        <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>Payment</span>
                    </div>
                </div>

                {/* Step 1: Information */}
                {step === 1 && (
                    <form onSubmit={handleNextStep} className="animate-fade-in">
                        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-8 shadow-sm"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                required
                                placeholder="First Name"
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                value={data.firstName}
                                onChange={(e) => setData('firstName', e.target.value)}
                            />
                            <input
                                type="text"
                                required
                                placeholder="Last Name"
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                value={data.lastName}
                                onChange={(e) => setData('lastName', e.target.value)}
                            />
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="Address"
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-4 shadow-sm"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <input
                                type="text"
                                required
                                placeholder="City"
                                className="col-span-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                            />
                            <select
                                className="col-span-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm appearance-none"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                            >
                                {[
                                    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
                                    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
                                    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
                                    "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
                                    "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
                                    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
                                    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
                                    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
                                    "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
                                    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
                                    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
                                    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                                    "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
                                    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
                                    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
                                    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
                                    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
                                    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
                                    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
                                    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
                                    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                                ].map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                required
                                placeholder="ZIP Code"
                                className="col-span-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                value={data.postalCode}
                                onChange={(e) => setData('postalCode', e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end mt-8">
                            <button type="submit" className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-lg flex items-center gap-2 group">
                                Continue to Payment <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <form onSubmit={handleCheckoutSubmit} className="animate-fade-in">
                        {/* Summary of Info */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-8 text-sm">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
                                <span className="text-slate-500">Contact</span>
                                <span className="font-medium text-slate-800">{data.email || 'guest@example.com'}</span>
                                <button type="button" onClick={() => setStep(1)} className="text-primary hover:underline text-xs">Change</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Ship to</span>
                                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{data.address}, {data.city}</span>
                                <button type="button" onClick={() => setStep(1)} className="text-primary hover:underline text-xs">Change</button>
                            </div>
                        </div>

                        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2 mt-8">Payment</h2>
                        <p className="text-sm text-slate-500 mb-6">All transactions are secure and encrypted.</p>

                        {/* Saved Payment Methods Selection */}
                        {paymentMethods && paymentMethods.length > 0 && (
                            <div className="mb-8">
                                <h3 className="font-bold text-slate-800 mb-3 text-sm">Saved Cards</h3>
                                <div className="space-y-3">
                                    {paymentMethods.map(method => (
                                        <div
                                            key={method.id}
                                            className={`p-4 border rounded-xl cursor-pointer transition-colors flex items-center gap-4 ${data.cardNumber.endsWith(method.last4)
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-slate-200 bg-white hover:border-primary/50'
                                                }`}
                                            onClick={() => {
                                                setData(prev => ({
                                                    ...prev,
                                                    cardNumber: `**** **** **** ${method.last4}`,
                                                    expiry: `${String(method.expiry_month).padStart(2, '0')}/${String(method.expiry_year).substring(2)}`,
                                                    cvv: '***' // mock CVV since it's a simulated saved card
                                                }));
                                            }}
                                        >
                                            <div className="w-12 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">
                                                {method.brand === 'Visa' ? 'VISA' : (method.brand === 'MasterCard' ? 'MC' : method.brand.toUpperCase().substring(0, 4))}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-mono text-sm font-medium text-slate-900">•••• {method.last4}</div>
                                                <div className="text-xs text-slate-500">Expires {String(method.expiry_month).padStart(2, '0')}/{String(method.expiry_year).substring(2)}</div>
                                            </div>
                                            {data.cardNumber.endsWith(method.last4) && (
                                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                                                    <span className="material-icons text-[12px]">check</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-px bg-slate-200"></div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">OR</span>
                                    <div className="flex-1 h-px bg-slate-200"></div>
                                </div>
                            </div>
                        )}

                        <div className="bg-orange-50/30 border-2 border-primary rounded-3xl overflow-hidden shadow-sm mb-12">
                            <div className="p-5 border-b border-primary/10 flex justify-between items-center">
                                <span className="font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-icons text-primary">credit_card</span> Credit Card
                                </span>
                                <div className="flex gap-1">
                                    <img src="/assets/visa.svg" className="h-5 bg-white px-1.5 rounded-sm shadow-sm" alt="Visa" />
                                    <img src="/assets/mastercard.svg" className="h-5 drop-shadow-sm" alt="MC" />
                                </div>
                            </div>
                            <div className="p-6 relative space-y-4">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="w-full bg-white border border-indigo-200 rounded-lg px-4 py-4 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm shadow-inner"
                                    value={data.cardNumber}
                                    onChange={(e) => setData('cardNumber', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Expiration Date (MM/YY)"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-4 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm shadow-inner"
                                        value={data.expiry}
                                        onChange={(e) => setData('expiry', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Security Code"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-4 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm shadow-inner"
                                        value={data.cvv}
                                        onChange={(e) => setData('cvv', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-medium transition-colors flex items-center gap-1">
                                <span className="material-icons text-sm">chevron_left</span> Back to info
                            </button>
                            <button type="submit" disabled={processing} className="bg-[#0b1120] text-white px-10 py-4 rounded-3xl font-bold hover:bg-black transition-colors shadow-xl flex items-center gap-2 disabled:opacity-50">
                                {processing ? 'Processing...' : `Pay $${(Number(total) * 1.08).toLocaleString()}`}
                                {!processing && <span className="material-icons text-sm">lock</span>}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-white border-l border-slate-200 px-4 lg:px-12 py-12 lg:py-16 md:overflow-y-auto hidden md:block z-20">
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto scrollbar-hide">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                            <div className="relative">
                                <div className="w-16 h-16 bg-slate-100 rounded-md border border-slate-200 overflow-hidden">
                                    {/* NOTE FOR FUTURE DEVS: Keep object-contain object-center to prevent stretching, zooming, and cut-offs regardless of uploaded image ratio. */}
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain object-center mix-blend-multiply p-1" />
                                </div>
                                <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                <span className="text-xs text-slate-500">{item.shop_name}</span>
                            </div>
                            <span className="font-medium text-slate-700 text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-b border-slate-200 py-4 mb-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-medium">${Number(total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="text-slate-400">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Taxes</span>
                        <span className="font-medium">${(Number(total) * 0.08).toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-900 text-lg">Total</span>
                    <div className="text-right">
                        <span className="text-xs text-slate-500 mr-2">USD</span>
                        <span className="font-heading text-3xl font-bold text-slate-900">${(Number(total) * 1.08).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
