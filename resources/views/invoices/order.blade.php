<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Invoice #{{ $order->id }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 30px;
        }

        .header {
            width: 100%;
            margin-bottom: 40px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #4f46e5;
            /* Primary color */
        }

        .invoice-title {
            text-align: right;
            font-size: 24px;
            font-weight: normal;
            color: #666;
            margin-top: -35px;
        }

        .details-container {
            width: 100%;
            margin-bottom: 40px;
        }

        .details-left,
        .details-right {
            width: 48%;
            display: inline-block;
            vertical-align: top;
        }

        .details-right {
            text-align: right;
        }

        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #999;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .table th,
        .table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            text-align: left;
        }

        .table th {
            background-color: #f9fafb;
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
        }

        .table .text-right {
            text-align: right;
        }

        .table .text-center {
            text-align: center;
        }

        .totals-container {
            width: 100%;
        }

        .totals {
            width: 40%;
            float: right;
        }

        .totals table {
            width: 100%;
            border-collapse: collapse;
        }

        .totals td {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .totals .final-total {
            font-size: 18px;
            font-weight: bold;
            border-bottom: none;
            padding-top: 15px;
        }

        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 12px;
            color: #999;
        }

        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
</head>

<body>

    <div class="header">
        <div class="logo">Shopify</div>
        <div class="invoice-title">INVOICE #{{ $order->id }}</div>
    </div>

    <div class="details-container">
        <div class="details-left">
            <div class="section-title">Billed To / Shipped To:</div>
            <strong>{{ $order->user->name ?? 'Customer' }}</strong><br>
            {{ $order->user->address_line_1 ?? 'No Address Provided' }}<br>
            @if($order->user->city)
                {{ $order->user->city }},
            @endif
            {{ $order->user->state ?? '' }} {{ $order->user->postal_code ?? '' }}<br>
            @if($order->user->phone)
                Phone: {{ $order->user->phone }}
            @endif
        </div>
        <div class="details-right">
            <div class="section-title">Order Details:</div>
            <strong>Date:</strong> {{ \Carbon\Carbon::parse($order->created_at)->format('M d, Y') }}<br>
            <strong>Status:</strong> {{ ucfirst(str_replace('_', ' ', $order->status)) }}<br>
            @if($order->payment_method)
                <strong>Payment Method:</strong> {{ ucfirst($order->payment_method) }}<br>
            @endif
            @if($order->tracking_id)
                <strong>Tracking ID:</strong> {{ $order->tracking_id }}<br>
            @endif
        </div>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Shop</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
                <tr>
                    <td>
                        <strong>{{ $item->product->name ?? 'Unknown Product' }}</strong>
                    </td>
                    <td>{{ $item->subOrder->shop->shop_name ?? 'Shopify Direct' }}</td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-right">${{ number_format($item->price, 2) }}</td>
                    <td class="text-right">${{ number_format($item->price * $item->quantity, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-container clearfix">
        <div class="totals">
            <table>
                <tr>
                    <td>Subtotal:</td>
                    <td class="text-right">${{ number_format($order->total_amount, 2) }}</td>
                </tr>
                <tr>
                    <td>Shipping:</td>
                    <td class="text-right">Free</td>
                </tr>
                <tr>
                    <td>Tax (8%):</td>
                    <td class="text-right">${{ number_format($order->total_amount * 0.08, 2) }}</td>
                </tr>
                <tr>
                    <td class="final-total">Total:</td>
                    <td class="text-right final-total">USD ${{ number_format($order->total_amount * 1.08, 2) }}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="footer">
        Thank you for your business! If you have any questions, please contact our support team.
    </div>

</body>

</html>