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
        return $this->morphedByMany(User::class, 'genreables');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function projects()
    {
        return $this->morphedByMany(Project::class, 'genreables');
    }

    public function selected()
    {
        return $this->hasMany(SelectedGenres::class, 'genre');
    }
}
