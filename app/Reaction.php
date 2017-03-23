<?php

namespace App;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Events\Event;

class Reaction extends Model
{
    use UuidForKey, Filterable, ActivityTrait;
    //
    protected $table = 'reactions';

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
        return $this->project();
    }

    public function activityNotify()
    {
        $data = [
            'ownerEmail' => $this->target->owner->email,
            'ownerName' => $this->target->owner->fullName,
            'subject' => $this->user->fullName . ' reacted to your video, ' . $this->target->name,
            'targetName' => $this->target->name,
            'targetUrlId' => $this->target->url_id,
            'actorName' => $this->user->fullName,
            'actorUrlId' => $this->user->url_id,
        ];
        Mail::queue('emails.notifications.reaction', $data, function ($mail) use ($data) {
            $mail->to($data['ownerEmail'], $data['ownerName'])
                ->from('notifications@mail.getindiewise.com', 'Notifications on IndieWise')
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

    /*public static function boot()
    {

        parent::boot();

        static::created(function($reaction) {

        });

        static::deleted(function($reaction) {

        });
    }*/

}
