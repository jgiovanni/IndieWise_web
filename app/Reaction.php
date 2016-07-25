<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use Illuminate\Database\Eloquent\Model;
use IndieWise\Events\Event;

class Reaction extends Model
{
    use UuidForKey, Filterable, ActivityTrait;
    //
    protected $table = 'Reaction';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activityVerb()
    {
        return 'react';
    }

    public static function boot()
    {

        parent::boot();

        static::created(function($reaction) {
            Event::fire('reaction.created', $reaction);
        });

        static::deleted(function($reaction) {
            Event::fire('reaction.deleted', $reaction);
        });
    }

}
