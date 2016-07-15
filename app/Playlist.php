<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $table = 'Playlist';
    public $timestamps = false;

    public function items()
    {
        return $this->hasMany(PlaylistItem::class);
    }
}
