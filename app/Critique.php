<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Critique extends Model
{
    use SoftDeletes, Filterable, UuidForKey;

    protected $table = 'Critique';

    protected $guarded = ['id', 'url_id'];

    protected $with = ['user'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    // Relations
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function nomination()
    {
        return $this->hasOne(Nomination::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }
}
