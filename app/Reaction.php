<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
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

    public function activityLazyLoading()
    {
        return array('user');
    }

    public function activityVerb()
    {
        return 'react';
    }

    public function target()
    {
        return $this->belongsTo(Project::class);
    }

    public function activityNotify()
    {
        $targetFeeds = [];
        $targetFeeds[] = FeedManager::getNotificationFeed($this->target->owner_id);
        return $targetFeeds;
    }
    /*public static function boot()
    {

        parent::boot();

        static::created(function($reaction) {

        });

        static::deleted(function($reaction) {

        });
    }*/

}
