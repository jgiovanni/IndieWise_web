<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use UuidForKey;

    protected $table = 'playlists';
    protected $guarded = ['id'];
    public $timestamps = false;

    public function playlistItems()
    {
        return $this->hasMany(PlaylistItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
