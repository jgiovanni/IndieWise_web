<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    //
    protected $table = 'Language';
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany('IndieWise\Projects');
    }

}
