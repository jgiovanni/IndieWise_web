<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    protected $table = 'PlaylistItem';
    public $timestamps = false;

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }
}
