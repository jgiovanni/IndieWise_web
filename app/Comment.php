<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes, Filterable, UuidForKey;
    //
    protected $table = 'Comment';

    protected $with = ['author'];

    public $dates = ['created_at', 'updated_at', 'deleted_at', 'edited_at', 'replied_at'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function critique()
    {
        return $this->belongsTo(Critique::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'comment_id');
    }


}
