<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;

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
        if (isset($this->target->user_id)){
            $data = ['body' => $this->body, 'critique_url_id' => $this->target->critique->url_id];
        } else {
            $data = ['body' => $this->body, 'critique_url_id' => $this->target->url_id];
        }
        return $data;
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
        if (!is_null($this->comment_id)) {
            return $this->comment();
        } else return $this->critique();
    }

    public function activityNotify()
    {
        if ( setting('email_comment', true, "'".$this->target->author->id."'") ) {
            $data = [
                'ownerEmail' => $this->target->author->email,
                'ownerName' => $this->target->author->fullName,
                'subject' => !is_null($this->comment_id) ? $this->author->fullName . ' replied to your' : '',
                'message' => $this->author->fullName . ' commented on your video, ' . $this->target->name,
            ];
            Mail::raw($data['message'], function ($mail) use ($data) {
                $mail->to($data['ownerEmail'], $data['ownerName'])
                    ->from('notifications@getindiewise.com', 'Notifications on IndieWise')
                    ->subject($data['subject']);
            });
        }

        $targetFeeds = [];
        $targetId = !is_null($this->target->user_id) ? $this->target->user_id : $this->target->owner_id;
        $targetFeeds[] = FeedManager::getNotificationFeed($targetId);
        return $targetFeeds;
    }
}
