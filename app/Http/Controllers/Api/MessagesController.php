<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;

use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\MessageTransformer;
use IndieWise\User;
use Carbon\Carbon;
use IndieWise\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;


class MessagesController extends Controller
{
    /**
     * Show all of the message threads to the user.
     *
     * @return mixed
     */
    public function index()
    {
        $currentUserId = $this->auth()->user()->id;

        $conversations = Thread::with(/*'messages.user', */'participants.user')->forUser($currentUserId)->get();
        $conversations = $conversations->each(function ($conversation, $key) {
            $conversation->append('latestMessage');
        });

//        $user = User::with('threads.participants', 'threads.messages.user')->findOrFail($currentUserId);
//        $conversations = $user->threads;
        return response()->json(compact('conversations'/*, 'currentUserId'*/));
//        return view('messenger.index', compact('user', 'currentUserId'));
    }

    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $conversation = Thread::with('messages.user', 'participants.user')->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error_message', 'The thread with ID: ' . $id . ' was not found.'], 401);
        }

        // show current user in list if not a current participant
        // $users = User::whereNotIn('id', $thread->participantsUserIds())->get();

        // don't show the current user in list
        $userId = $this->auth()->user()->id;
//        $users = User::whereNotIn('id', $thread->participantsUserIds($userId))->get();

        $conversation->markAsRead($userId);
        $conversation->append('latestMessage');

        return response()->json(compact('conversation'));
    }

    public function showMessages(Request $request, $id)
    {
        try {
            $messages = Message::with('user')->where('thread_id', $id)->orderBy('created_at', 'DESC')->paginate($request->get('per_page', 10));
        } catch (ModelNotFoundException $e) {
            return response()->json(['error_message', 'The thread with ID: ' . $id . ' was not found.'], 401);
        }

        return $this->response->paginator($messages, new MessageTransformer);
    }

    /**
     * Stores a new message thread.
     *
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {

        $thread = Thread::create(
            [
                'subject' => $request->get('subject'),
            ]
        );

        // Message
        Message::create(
            [
                'thread_id' => $thread->id,
                'user_id'   => $this->auth()->user()->id,
                'body'      => $request->get('message'),
            ]
        );

        // Sender
        Participant::create(
            [
                'thread_id' => $thread->id,
                'user_id'   => $this->auth()->user()->id,
                'last_read' => new Carbon,
            ]
        );

        // Recipients
        if ($request->has('recipients')) {
            $thread->addParticipants($request->get('recipients'));
        }

        return response()->json($thread);
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        try {
            $conversation = Thread::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error_message', 'The thread with ID: ' . $id . ' was not found.'], 401);
        }

        $conversation->activateAllParticipants();

        // Message
        $message = Message::create(
            [
                'thread_id' => $conversation->id,
                'user_id'   => $this->auth()->user()->id,
                'body'      => $request->get('message'),
            ]
        );
        $message->load('user');

        // Add replier as a participant
        $participant = Participant::firstOrCreate(
            [
                'thread_id' => $conversation->id,
                'user_id'   => $this->auth()->user()->id,
            ]
        );
        $participant->last_read = new Carbon;
        $participant->save();

        // Recipients
        if ($request->has('recipients')) {
            $conversation->addParticipants($request->get('recipients'));
        }

        return $message;
        return self::show($id);
    }

    public function newMessages() {
        $threads = Thread::forUserWithNewMessages($this->auth()->user()->id)->get();
        return response()->json($threads);
    }

}
