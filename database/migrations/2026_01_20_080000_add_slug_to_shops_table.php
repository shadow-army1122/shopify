<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('shops', 'slug')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->string('slug')->nullable()->unique()->after('shop_name');
            });
        }
    }

    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
