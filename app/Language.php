<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use UuidForKey;
    //
    protected $table = 'languages';
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany(Projects::class);
    }

}
