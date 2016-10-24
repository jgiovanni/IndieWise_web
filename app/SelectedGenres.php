<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SelectedGenres extends Model
{
    use UuidForKey;
    //
    protected $table = 'Genres';

    protected $with = ['genre'];

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre');
    }
}
