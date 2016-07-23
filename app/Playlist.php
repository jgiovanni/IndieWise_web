<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use UuidForKey;

    protected $table = 'Playlist';
    public $timestamps = false;

    public function items()
    {
        return $this->hasMany(PlaylistItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
