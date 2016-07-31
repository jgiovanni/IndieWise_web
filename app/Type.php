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

    /**
     * Get all of the users that are assigned this tag.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'UserTypes');
    }

}
