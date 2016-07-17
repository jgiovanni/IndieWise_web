<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use UuidForKey;
    //
    protected $table = 'Country';
    
    public $timestamps = false;

    public function projects()
    {
        return $this->hasMany(Project::class, 'filmingCountry_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

}
