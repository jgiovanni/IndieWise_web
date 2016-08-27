<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;
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
        if ( setting('email_win', true, "'".$this->target->owner->id."'") ) {
            $data = [
                'ownerEmail' => $this->target->owner->email,
                'ownerName' => $this->target->owner->fullName,
                'subject' => "You've won an IndieWise Award! (Unofficial)",
                'body' => "Congratulations, " . $this->target->owner->fullName . "!\r\n Your video, " . $this->target->name . " has just won, The " . $this->award->name . "Award! \r\n Kindly confirm receipt of this e-mail, with a simple reply. Please bear in mind that this notification email serves only as a Pending Win. However, an IndieWise Representative needs to verify, and will respond within 48 hours to confirm whether your Win is Official [please see our Terms to understand our Award Policy]. Once confirmed, we will respond with your Official Gold IndieWise Laurel, as evidence of your Award.",
            ];
            Mail::queue('emails.blank', $data, function ($mail) use ($data) {
                $mail->to($data['ownerEmail'], $data['ownerName'])
                    ->from('awards@getindiewise.com', 'IndieWise Awards')
                    ->subject($data['subject']);
            });
        }

        $targetFeeds = [];
        $targetFeeds[] = FeedManager::getNotificationFeed($this->owner_id);
        return $targetFeeds;
    }

    public function activityExtraData()
    {
        return ['project_name' => $this->target->name, 'project_url_id' => $this->target->url_id, 'award' => $this->award->name];
    }

    public static function boot()
    {

        parent::boot();

        static::created(function($win) {
//            Event::fire('win.created', $win);
        });

        static::deleted(function($win) {
//            Event::fire('win.deleted', $win);
        });
    }

}
