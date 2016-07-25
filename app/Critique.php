<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use IndieWise\Events\Event;

class Critique extends Model
{
    use SoftDeletes, Filterable, UuidForKey, ActivityTrait;

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

    public static function boot()
    {

        parent::boot();

        static::created(function($critique) {
            Event::fire('critique.created', $critique);
        });

        static::deleted(function($critique) {
            Event::fire('critique.deleted', $critique);
        });
    }

}
