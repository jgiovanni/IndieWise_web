<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use UuidForKey;

    //
    protected $table = 'Rating';
}
