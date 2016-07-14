<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    //
    protected $table = 'genres';
    public $timestamps = false;

    /**
     * Get all of the users that are assigned this tag.
     */
    public function users()
    {
        return $this->morphedByMany('IndieWise\User', 'genres_selected');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function projects()
    {
        return $this->morphedByMany('IndieWise\Project', 'genres_selected');
    }
}
