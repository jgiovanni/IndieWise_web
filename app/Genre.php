<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use UuidForKey;
    //
    protected $table = 'genres';
    public $timestamps = false;

    /**
     * Get all of the users that are assigned this tag.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'genreables');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'genreables');
    }
}
