<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes, UuidForKey;
    //
    protected $table = 'comments';

    public $dates = ['created_at', 'updated_at', 'deleted_at', 'edited_at', 'replied_at'];

    public function author()
    {
        return $this->belongsTo('IndieWise\User');
    }

    public function critique()
    {
        return $this->belongsTo('IndieWise\Critique');
    }

    public function comment()
    {
        return $this->belongsTo('IndieWise\Comment');
    }

    public function replies()
    {
        return $this->hasMany('IndieWise\Comment');
    }


}
