<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased bg-gray-50">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full z-10">
            <div class="h-16 flex items-center px-6 border-b border-gray-100">
                <a href="{{ route('home') }}" class="font-display font-bold text-xl tracking-tight text-gray-900">
                    Market<span class="text-primary-600">Place</span>
                </a>
            </div>

            <nav class="p-4 space-y-1 overflow-y-auto h-full pb-20">
                <a href="{{ route('home') }}"
                    class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors mb-4 border border-transparent hover:border-gray-100">
                    <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                </a>
                <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Overview</p>
                <a href="{{ route('dashboard') }}"
                    class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                    <svg class="mr-3 h-5 w-5 {{ request()->routeIs('dashboard') ? 'text-primary-600' : 'text-gray-400' }}"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                </a>

                @if(Auth::user()->role === 'seller' || Auth::user()->shop)
                    <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Seller Tools</p>
                    <a href="{{ route('products.index') }}"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('products.*') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                        <svg class="mr-3 h-5 w-5 {{ request()->routeIs('products.*') ? 'text-primary-600' : 'text-gray-400' }}"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Products
                    </a>
                    <a href="{{ route('seller.orders.index') }}"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('seller.orders.*') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                        <svg class="mr-3 h-5 w-5 {{ request()->routeIs('seller.orders.*') ? 'text-primary-600' : 'text-gray-400' }}"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Orders
                    </a>
                    <a href="{{ route('seller.payouts.index') }}"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('seller.payouts.*') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                        <svg class="mr-3 h-5 w-5 {{ request()->routeIs('seller.payouts.*') ? 'text-primary-600' : 'text-gray-400' }}"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Payouts
                    </a>
                @endif

                @if(Auth::user()->role === 'admin')
                    <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Administration
                    </p>
                    <a href="{{ route('admin.dashboard') }}"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('admin.dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                        <svg class="mr-3 h-5 w-5 {{ request()->routeIs('admin.dashboard') ? 'text-primary-600' : 'text-gray-400' }}"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verifications
                    </a>
                    <a href="{{ route('admin.payouts.index') }}"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl {{ request()->routeIs('admin.payouts.*') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }} transition-colors">
                        <svg class="mr-3 h-5 w-5 {{ request()->routeIs('admin.payouts.*') ? 'text-primary-600' : 'text-gray-400' }}"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Payout Approvals
                    </a>
                @endif
            </nav>

            <div class="absolute bottom-0 w-full border-t border-gray-100 p-4 bg-white">
                <div class="flex items-center">
                    <div
                        class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
                        {{ substr(Auth::user()->name, 0, 1) }}
                    </div>
                    <div class="ml-3">
                        <p class="text-xs font-bold text-gray-900">{{ Auth::user()->name }}</p>
                        <p class="text-xs text-gray-500">{{ Auth::user()->email }}</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content with Header -->
        <main class="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
            <!-- Mobile Header -->
            <header class="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <div class="flex-shrink-0 flex items-center md:hidden">
                                <!-- Mobile Logo -->
                                <span class="font-display font-bold text-lg">MarketPlace</span>
                            </div>
                            <div class="hidden md:flex ml-4 items-center">
                                <h2 class="font-bold text-xl text-gray-800 leading-tight font-display">
                                    {{ $header ?? 'Dashboard' }}
                                </h2>
                            </div>
                        </div>

                        <!-- Right Side -->
                        <div class="flex items-center">
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit"
                                    class="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <div class="py-12 px-4 sm:px-6 lg:px-8">
                @if (isset($header) && request()->isMobile)
                    <!-- Mobile Title Fallback -->
                    <h2 class="md:hidden font-bold text-xl text-gray-800 mb-6 font-display">
                        {{ $header }}
                    </h2>
                @endif

                {{ $slot }}
            </div>
        </main>
    </div>
</body>

</html>