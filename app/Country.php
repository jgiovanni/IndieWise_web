<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    //
    protected $table = 'countries';
    
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany('IndieWise\Projects');
    }

    public function users()
    {
        return $this->hasMany('IndieWise\User');
    }

}
