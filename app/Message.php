<?php

namespace IndieWise;

use Cmgmyr\Messenger\Models\Models;
use Cmgmyr\Messenger\Models\Participant;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Message extends Model
{
    use ActivityTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The relationships that should be touched on save.
     *
     * @var array
     */
    protected $touches = ['thread'];

    /**
     * The attributes that can be set with Mass Assignment.
     *
     * @var array
     */
    protected $fillable = ['thread_id', 'user_id', 'body'];

    /**
     * Validation rules.
     *
     * @var array
     */
    protected $rules = [
        'body' => 'required',
    ];

    /**
     * {@inheritDoc}
     */
    public function __construct(array $attributes = [])
    {
        $this->table = Models::table('messages');

        parent::__construct($attributes);
    }

    /**
     * Thread relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function thread()
    {
        return $this->belongsTo(Models::classname(Thread::class), 'thread_id', 'id');
    }

    /**
     * User relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(Models::classname(User::class), 'user_id');
    }

    public function activityLazyLoading()
    {
        return array('user');
    }

    /**
     * Participants relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function participants()
    {
        return $this->hasMany(Models::classname(Participant::class), 'thread_id', 'thread_id');
    }

    /**
     * Recipients of this message.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function recipients()
    {
        return $this->participants()->where('user_id', '!=', $this->user_id);
    }

    public function activityActorMethodName()
    {
        return 'user';
    }

    /**
     * Stream: Change activity verb to 'created':
     */
    public function activityVerb()
    {
        return 'message';
    }

    /**
     * Stream: Add extra activity data - task name, and user's display name:
     */
    public function activityExtraData()
    {
        return ['body' => $this->body, 'conversation' => $this->thread_id];
    }

    public function target()
    {
        return $this->recipients();
    }

    public function activityNotify()
    {
        $targetFeeds = [];
        foreach ($this->target as $target) {
            if ( setting('email_message', true, "'$target->user_id'") ) {
                $data = [
                    'ownerEmail' => $target->email,
                    'ownerName' => $target->fullName,
                    'subject' => $this->user->fullName . " sent you a message",
                    'actorName' => $this->user->fullName,
                    'actorUrlId' => $this->user->url_id,
                ];
                Mail::queue('emails.notifications.message', $data, function ($mail) use ($data) {
                    $mail->to($data['ownerEmail'], $data['ownerName'])
                        ->from('notifications@getindiewise.com', 'Notifications on IndieWise')
                        ->subject($data['subject']);
                });
            }

            $targetFeeds[] = FeedManager::getFeed('message', $target->user_id);
        }
        return $targetFeeds;
    }

}
