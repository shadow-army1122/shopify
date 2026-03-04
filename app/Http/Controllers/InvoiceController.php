<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    /**
     * Generate and download the invoice PDF for a specific order
     */
    public function download($id)
    {
        // Fetch the order with all necessary relationships
        $order = Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->with(['items.product', 'subOrders.shop', 'user'])
            ->firstOrFail();

        // Load the view and pass the order data
        $pdf = Pdf::loadView('invoices.order', compact('order'));

        // Return the generated PDF for download named simply invoice-orderId.pdf
        return $pdf->download('invoice-' . $order->id . '.pdf');
    }
}
