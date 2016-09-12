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
        if ( setting()->get('email_nomination', true, "'".$this->target->owner->id."'") ) {
            $data = [
                'ownerEmail' => $this->target->owner->email,
                'ownerName' => $this->target->owner->fullName,
                'subject' => $this->user->fullName . ' nominated your video, ' . $this->target->name,
                'targetName' => $this->target->name,
                'targetUrlId' => $this->target->url_id,
                'actorName' => $this->user->fullName,
                'actorUrlId' => $this->user->url_id,
                'awardName' => $this->award->name,
            ];
            Mail::queue('emails.notifications.nomination', $data, function ($mail) use ($data) {
                $mail->to($data['ownerEmail'], $data['ownerName'])
                    ->from('notifications@mail.getindiewise.com', 'Notifications on IndieWise')
                    ->subject($data['subject']);
            });
        }

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
            // Find Project that has not been awarded a win
            $project = Project::whereHas('wins', function ($query) use ($nomination) {
                $query->where('award_id', $nomination->award_id);
            }, '=', 0)->whereHas('nominations', function ($query) use ($nomination) {
                $query->where('award_id', $nomination->award_id);
            }, '>=', 5)->find($nomination->project_id);

            if (!is_null($project)) {
                //Award win to project
                $project->wins()->create([
                    'award_id' => $nomination->award_id,
                    'owner_id' => $project->owner_id,
                ]);
            }
        });

        static::deleted(function($nomination) {

        });
    }

}
