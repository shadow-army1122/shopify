<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'shop_id',
        'category_id',
        'group_id',
        'name',
        'slug',
        'image_url',
        'price',
        'stock',
        'details',
        'is_active',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    protected function imageUrl(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: function ($value) {
                if (!$value)
                    return null;
                if (\Illuminate\Support\Str::startsWith($value, ['http://', 'https://', '/storage/', '/assets/', '/'])) {
                    return $value;
                }
                return '/storage/' . $value;
            }
        );
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
