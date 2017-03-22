<?php

namespace App;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    use UuidForKey, Filterable;

    protected $table = 'playlist_items';
    public $timestamps = false;

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
