<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $fillable = [
        'user_id',
        'brand',
        'last4',
        'expiry_month',
        'expiry_year',
        'is_default',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
