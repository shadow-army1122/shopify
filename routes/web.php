<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SellerAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\StorefrontController::class, 'index'])->name('home');
Route::get('/product/{slug}', [App\Http\Controllers\StorefrontController::class, 'show'])->name('shop.show');
Route::get('/seller/{shop}', [App\Http\Controllers\StorefrontController::class, 'seller'])->name('shop.seller');

// Info Pages
Route::get('/about', function () {
    return \Inertia\Inertia::render('Info/About');
})->name('info.about');
Route::get('/contact', function () {
    return \Inertia\Inertia::render('Info/Contact');
})->name('info.contact');
Route::get('/faq', function () {
    return \Inertia\Inertia::render('Info/FAQ');
})->name('info.faq');

// Cart Routes
use App\Http\Controllers\CartController;
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add/{id}', [CartController::class, 'add'])->name('cart.add');
Route::get('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
Route::patch('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');

use App\Http\Controllers\CheckoutController;
Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/success/{id}', [CheckoutController::class, 'success'])->name('checkout.success');
});

Route::get('/dashboard', [App\Http\Controllers\BuyerController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Orders
    Route::get('/my-orders', [App\Http\Controllers\BuyerController::class, 'orders'])->name('buyer.orders.index');
    Route::get('/my-orders/{id}', [App\Http\Controllers\BuyerController::class, 'showOrder'])->name('buyer.orders.show');
    Route::get('/my-orders/{id}/invoice', [App\Http\Controllers\InvoiceController::class, 'download'])->name('buyer.orders.invoice');

    // Reviews
    Route::post('/reviews', [App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');

    // Payment Methods
    Route::get('/buyer/payment-methods', [App\Http\Controllers\PaymentMethodController::class, 'index'])->name('buyer.payment-methods.index');
    Route::post('/buyer/payment-methods', [App\Http\Controllers\PaymentMethodController::class, 'store'])->name('buyer.payment-methods.store');
    Route::delete('/buyer/payment-methods/{paymentMethod}', [App\Http\Controllers\PaymentMethodController::class, 'destroy'])->name('buyer.payment-methods.destroy');

    // Tall-E Assistant
    Route::get('/buyer/assistant', function () {
        return \Inertia\Inertia::render('Buyer/Assistant');
    })->name('buyer.assistant.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// AI Features
Route::get('/search/smart', [App\Http\Controllers\SmartSearchController::class, 'search'])->name('search.smart');
Route::get('/seller/assistant', [App\Http\Controllers\SellerAssistantController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('seller.assistant.index');

Route::post('/seller/assistant/chat', [App\Http\Controllers\SellerAssistantController::class, 'chat'])
    ->middleware(['auth', 'verified'])
    ->name('seller.assistant.chat');

require __DIR__ . '/auth.php';

require __DIR__ . '/auth.php';

Route::middleware('guest')->group(function () {
    Route::get('seller/register', [SellerAuthController::class, 'create'])->name('seller.register');
    Route::post('seller/register', [SellerAuthController::class, 'store']);
});

use App\Http\Controllers\ProductController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/api/categories/search', [App\Http\Controllers\CategorySearchController::class, 'search'])->name('api.categories.search');

    Route::resource('products', ProductController::class);
    Route::resource('seller/orders', App\Http\Controllers\SellerOrderController::class, ['names' => 'seller.orders'])->only(['index', 'show', 'update']);

    // Seller Dashboard & Analysis
    Route::get('/seller/dashboard', [App\Http\Controllers\SellerDashboardController::class, 'index'])->name('seller.dashboard');
    Route::get('/seller/analysis', [App\Http\Controllers\SellerDashboardController::class, 'analysis'])->name('seller.analysis');

    // Payout Routes
    Route::get('/seller/payouts', [App\Http\Controllers\PayoutController::class, 'index'])->name('seller.payouts.index');
    Route::post('/seller/payouts', [App\Http\Controllers\PayoutController::class, 'store'])->name('seller.payouts.store');

    // Notifications
    Route::patch('/seller/notifications/{id}/read', [App\Http\Controllers\SellerNotificationController::class, 'markAsRead'])->name('seller.notifications.markAsRead');

    // Admin Routes - Verification
    Route::get('/admin/dashboard', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/approve/{id}', [App\Http\Controllers\AdminController::class, 'approve'])->name('admin.approve');

    // Admin Routes - Payouts
    Route::get('/admin/payouts', [App\Http\Controllers\AdminPayoutController::class, 'index'])->name('admin.payouts.index');
    Route::patch('/admin/payouts/{id}', [App\Http\Controllers\AdminPayoutController::class, 'update'])->name('admin.payouts.update');

    // Admin Routes - User Management
    Route::get('/admin/users', [App\Http\Controllers\AdminUserController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users/{id}/toggle-status', [App\Http\Controllers\AdminUserController::class, 'toggleStatus'])->name('admin.users.toggle-status');

    // Admin Routes - Settings
    Route::get('/admin/settings', [App\Http\Controllers\AdminSettingsController::class, 'index'])->name('admin.settings.index');
    Route::post('/admin/settings', [App\Http\Controllers\AdminSettingsController::class, 'update'])->name('admin.settings.update');

    // Admin Routes - Categories
    Route::resource('admin/categories', App\Http\Controllers\AdminCategoryController::class, ['names' => 'admin.categories']);

    // Admin Routes - Reviews (Moderation)
    Route::delete('/admin/reviews/{review}', [App\Http\Controllers\ReviewController::class, 'destroy'])->name('admin.reviews.destroy');

    // Admin Routes - Product Moderation
    Route::get('/admin/products', [App\Http\Controllers\AdminProductController::class, 'index'])->name('admin.products.index');
    Route::post('/admin/products/{id}/toggle-status', [App\Http\Controllers\AdminProductController::class, 'toggleStatus'])->name('admin.products.toggle-status');
    Route::patch('/admin/products/{id}', [App\Http\Controllers\AdminProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{id}', [App\Http\Controllers\AdminProductController::class, 'destroy'])->name('admin.products.destroy');
});

// Talk-E AI Shop Assistant
Route::post('/shop-assistant/enquire', [App\Http\Controllers\ShopAssistantController::class, 'enquire'])->name('shop.assistant.enquire');
