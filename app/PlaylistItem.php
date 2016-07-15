<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    use UuidForKey;

    protected $table = 'PlaylistItem';
    public $timestamps = false;

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }
}
