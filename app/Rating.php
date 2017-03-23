<?php

namespace App;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use App\Events\Event;

class Rating extends Model
{
    use UuidForKey, Filterable, ActivityTrait;

    protected $table = 'ratings';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'up' => 'boolean',
        'down' => 'boolean',
    ];

    /*
     * Set Bool values
     */
    public function setUpAttribute($val)
    {
        $this->attributes['up'] = (boolean)($val);
    }
    public function setDownAttribute($val)
    {
        $this->attributes['down'] = (boolean)($val);
    }

    public function activityVerb()
    {
        return 'rate';
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function activityActorMethodName()
    {
        return 'author';
    }

    public function activityLazyLoading()
    {
        return array('author');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function target()
    {
        return $this->project();
    }

    public function activityNotify()
    {
        $targetFeeds = [];
        $targetFeeds[] = FeedManager::getNotificationFeed($this->target->owner_id);
        return $targetFeeds;
    }

    public function activityExtraData()
    {
        return ['project_name' => $this->target->name, 'project_url_id' => $this->target->url_id,];
    }



}
