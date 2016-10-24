<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Comment;
use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendCommentNotificationEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $comment;

    /**
     * Create a new job instance.
     *
     * @param Comment $comment
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment->load('target', 'author');
        if ( setting()->get('email_comment', true, "'".$this->comment->target->user_id."'") ) {
            if ( !is_null($this->comment->target->comment_id) ) {
            // is reply to comment
            $data = [
                'targetText' => 'replied to your comment',
                'actorName' => $this->comment->author->fullName,
                'actorUrlId' => $this->comment->author->url_id,
                'ownerEmail' => $this->comment->target->author->email,
                'ownerName' => $this->comment->target->author->fullName,
                'subject' => $this->comment->author->fullName . 'replied to your comment.',
                'critique' => $this->comment->target->critique->url_id,
                'video' => $this->comment->target->critique->project->url_id,
            ];
            } else {
                // is comment to critique
                $data = [
                    'targetText' => 'commented on your critique',
                    'actorName' => $this->comment->author->fullName,
                    'actorUrlId' => $this->comment->author->url_id,
                    'ownerEmail' => $this->comment->target->user->email,
                    'ownerName' => $this->comment->target->user->fullName,
                    'subject' => $this->comment->author->fullName . 'commented on your critique.',
                    'critique' => $this->comment->target->url_id,
                    'video' => $this->comment->target->project->url_id,
                ];
            }
            Mail::queue('emails.notifications.comment', $data, function ($mail) use ($data) {
                $mail->to($data['ownerEmail'], $data['ownerName'])
                    ->from('notifications@mail.getindiewise.com', 'Notifications on IndieWise')
                    ->subject($data['subject']);
            });
        }
    }
}
