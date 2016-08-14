<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Http\Request;
use Illuminate\Support\Facades\URL;
use IndieWise\Http\Requests\v1\ContactRequest;
use Illuminate\Support\Facades\Mail;
use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Project;

class MailController extends Controller
{
    //

    public function __construct()
    {

    }

    public function contactUs(ContactRequest $request)
    {
        $from = $request->email;
        $name = $request->name;
        $subject = $request->subject;
        $bodyMessage = $request->message;
        Mail::send('emails.contact', compact('bodyMessage', 'subject', 'name', 'from'), function ($mail) use ($request) {
            $mail->to($request->to)
                ->replyTo($request->email, $request->name)
                ->from('noreply@getindiewise.com', 'IndieWise Contact Form')
                ->bcc('admin@getindiewise.com', 'IndieWise Admin')
                ->subject($request->subject);
        });
    }

    public function report(Request $request)
    {
        $from = $request->email;
        $name = $request->name;
        $subject = 'Reporting a video...';
        $project = Project::findOrFail($request->project_id);
        $bodyMessage = $request->body . ' The video is ' . $project->name . ' at ' .  URL::to('/' . $project->url_id);
        Mail::raw($bodyMessage, function ($mail) use ($request, $subject) {
            $mail->to('safeguard@getindiewise.com', 'IndieWise Safeguard')
                ->replyTo($request->email, $request->name)
                ->from('noreply@getindiewise.com', 'IndieWise Report Form')
                ->bcc('admin@getindiewise.com', 'IndieWise Admin')
                ->subject($subject);
        });
    }
}
