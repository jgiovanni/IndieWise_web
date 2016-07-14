<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    //
    protected $table = 'types';
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
