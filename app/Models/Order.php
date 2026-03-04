<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'parent_id', 'shop_id', 'total_amount', 'status', 'tracking_id', 'admin_commission', 'seller_earnings', 'payment_method', 'payment_proof'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function parent()
    {
        return $this->belongsTo(Order::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Order::class, 'parent_id');
    }

    public function subOrders()
    {
        return $this->hasMany(Order::class, 'parent_id');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
