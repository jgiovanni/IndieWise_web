<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use IndieWise\Events\Event;

class Win extends Model
{
    use SoftDeletes, Filterable, UuidForKey, ActivityTrait;
    //
    protected $table = 'AwardWin';

    protected $fillable = ['award_id', 'project_id', 'owner_id'];

    public $dates = ['created_at', 'updated_at', 'rewarded_at', 'deleted_at'];

    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function activityActorMethodName()
    {
        return 'owner';
    }

    public function activityVerb()
    {
        return 'win';
    }

    public function target()
    {
        return $this->project();
    }

    public function activityNotify()
    {
        $targetFeeds = [];
        $targetFeeds[] = FeedManager::getNotificationFeed($this->owner_id);
        return $targetFeeds;
    }

    public function activityExtraData()
    {
        return ['project_name' => $this->target->name, 'project_url_id' => $this->target->url_id,];
    }

    public static function boot()
    {

        parent::boot();

        static::created(function($win) {
            Event::fire('win.created', $win);
        });

        static::deleted(function($win) {
            Event::fire('win.deleted', $win);
        });
    }

}
