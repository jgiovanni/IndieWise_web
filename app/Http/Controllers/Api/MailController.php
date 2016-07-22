<?php

namespace IndieWise\Http\Controllers\Api;

use IndieWise\Http\Requests\v1\ContactRequest;
use Illuminate\Support\Facades\Mail;
use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;

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

    public function report()
    {

    }
}
