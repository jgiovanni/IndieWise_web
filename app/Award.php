<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use UuidForKey;
    //
    protected $table = 'Award';
    public $timestamps = false;

    public function wins()
    {
        return $this->hasMany(Win::class);
    }

    public function nominations()
    {
        return $this->hasMany(Nomination::class);
    }

}
