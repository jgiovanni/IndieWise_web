<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use UuidForKey, Filterable;
    //
    protected $table = 'Award';
    public $timestamps = false;

    public function wins()
    {
        return $this->hasMany(Win::class);
    }

    public function winners()
    {
        return $this->hasMany(Winner::class);
    }

    public function nominations()
    {
        return $this->hasMany(Nomination::class);
    }

}
