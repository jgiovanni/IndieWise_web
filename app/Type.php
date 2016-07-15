<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use UuidForKey;
    //
    protected $table = 'Type';
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
