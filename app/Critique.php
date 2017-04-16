<?php

namespace App;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Events\Event;

class Critique extends Model
{
    use SoftDeletes, Filterable, UuidForKey, ActivityTrait;

    protected $table = 'critiques';

    protected $guarded = ['id', 'url_id'];

//    protected $appends = ['project_url_id'];

    protected $with = ['user'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'private' => 'boolean',
        'overall' => 'float'
    ];

    /*
     * Set Bool values
     */
    public function setPrivateAttribute($val)
    {
        $this->attributes['private'] = (boolean)($val);
    }

    public function getProjectUrlIdAttribute()
    {
        return $this->project->url_id;
    }

    // Relations
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
        return array('user', 'project');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function nomination()
    {
        return $this->hasOne(Nomination::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function activityVerb()
    {
        return 'critique';
    }

    public function target()
    {
        return $this->project();
    }

    public function activityNotify()
    {
        if ( setting()->get('email_critique', true, "'".$this->target->owner->id."'") ) {
            $data = [
                'ownerEmail' => $this->target->owner->email,
                'ownerName' => $this->target->owner->fullName,
                'subject' => $this->user->fullName . ' critiqued your video, ' . $this->target->name,
                'targetName' => $this->target->name,
                'targetUrlId' => $this->target->url_id,
                'actorName' => $this->user->fullName,
                'actorUrlId' => $this->user->url_id,
                'urlId' => $this->url_id,
            ];
            Mail::queue('emails.notifications.critique', $data, function ($mail) use ($data) {
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

    public static function boot()
    {
        parent::boot();

        static::created(function($critique) {
            $critique->updateIndieWiseAverage($critique->project_id);
        });

        static::updated(function($critique) {
            $critique->updateIndieWiseAverage($critique->project_id);
        });

        static::deleted(function($critique) {
            $critique->updateIndieWiseAverage($critique->project_id);
        });
    }

    /**
     * Recalculate the indiewise average for the Project
     * @param $id
     */
    public function updateIndieWiseAverage($id)
    {
        DB::update('UPDATE projects p INNER JOIN ( SELECT (SUM(c.overall) / count(*)) AS iwAverage, c.project_id FROM critiques c GROUP BY c.project_id) AS crit ON crit.project_id = p.id SET p.iwRating = crit.iwAverage WHERE p.id = :id', [$id]);
    }


}
