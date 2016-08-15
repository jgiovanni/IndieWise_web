<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes, Filterable, UuidForKey, ActivityTrait;
    //
    protected $table = 'Comment';

    protected $with = ['author'];

    protected $guarded = ['id'];

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

    /**
     * Stream: Change activity verb to 'created':
     */
    public function activityVerb()
    {
        return 'comment';
    }

    /**
     * Stream: Add extra activity data - task name, and user's display name:
     */
    public function activityExtraData()
    {
        return ['body' => $this->body];
    }

    public function activityActorMethodName()
    {
        return 'author';
    }

    public function activityLazyLoading()
    {
        return array('author');
    }

    public function target()
    {
        if ($this->comment_id)
        return $this->critique();
    }

    public function activityNotify()
    {
        $targetFeeds = [];
        foreach ($this->target as $target) {
            $targetFeeds[] = FeedManager::getNotificationFeed($target->user_id);
        }
        return $targetFeeds;
    }



}
