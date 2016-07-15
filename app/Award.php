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
        return $this->hasMany('IndieWise\Win');
    }

    public function nominations()
    {
        return $this->hasMany('IndieWise\Nomination');
    }

}
