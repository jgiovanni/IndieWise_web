<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use IndieWise\Events\Event;

class Nomination extends Model
{
    use UuidForKey, Filterable, ActivityTrait;

    protected $table = 'Nomination';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at'];

    protected $with = ['award'];
    
    public function activityVerb()
    {
        return 'nominate';
    }

    // Relations
    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function critique()
    {
        return $this->belongsTo(Critique::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function target()
    {
        return $this->project();
    }

    public function activityNotify()
    {
        $data = [
            'ownerEmail' => $this->target->owner->email,
            'ownerName' => $this->target->owner->fullName,
            'subject' => $this->user->fullName . ' nominated your video, ' . $this->target->name,
            'message' => $this->user->fullName . ' nominated your video, ' . $this->target->name . ' for ' . $this->award->name,
        ];
        Mail::raw($data['message'], function ($mail) use ($data) {
            $mail->to($data['ownerEmail'], $data['ownerName'])
                ->from('notifications@getindiewise.com', 'Notifications on IndieWise')
                ->subject($data['subject']);
        });

        $targetFeeds = [];
        $targetFeeds[] = FeedManager::getNotificationFeed($this->target->owner_id);
        return $targetFeeds;
    }

    public function activityExtraData()
    {
        return ['project_name' => $this->target->name, 'project_url_id' => $this->target->url_id,];
    }

    public function activityLazyLoading()
    {
        return array('user', 'award');
    }

    public static function boot()
    {

        parent::boot();

        static::created(function($nomination) {

        });

        static::deleted(function($nomination) {

        });
    }

}
