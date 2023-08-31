<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Karyawan extends Eloquent
{
    protected $connection = 'mongodb';
    protected $guarded = [];
    protected $hidden = [
        'updated_at',
        'created_at',
    ];
}
