<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Critique extends Model
{
    use SoftDeletes, Filterable, UuidForKey;

    protected $table = 'Critique';

    protected $guarded = ['url_id'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    // Relations
    public function project()
    {
        return $this->belongsTo('IndieWise\Project');
    }

    public function author()
    {
        return $this->belongsTo('IndieWise\User');
    }

    public function comments()
    {
        return $this->hasMany('IndieWise\Comment');
    }

    public function nomination()
    {
        return $this->hasOne('IndieWise\Nomination');
    }

    public function actions()
    {
        return $this->hasMany('IndieWise\Action');
    }
}
