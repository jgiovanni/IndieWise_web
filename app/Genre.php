<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use UuidForKey;
    //
    protected $table = 'Genre';
    public $timestamps = false;

    /**
     * Get all of the users that are assigned this tag.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'Genreables');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'Genreables');
    }
}
