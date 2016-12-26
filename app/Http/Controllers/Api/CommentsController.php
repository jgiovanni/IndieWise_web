<?php

namespace App\Http\Controllers\Api;


use Dingo\Api\Http\Request;
use App\Comment;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Transformers\v1\CommentTransformer;

class CommentsController extends Controller
{
    private $comment;

    public function __construct(Comment $comment)
    {
        $this->middleware('api.auth', ['only' => ['store', 'update', 'destroy']]);
        $this->comment = $comment;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $comments = $this->comment->withCount('replies')->filter($request->all())->paginate($request->get('per_page', 50));
        return $this->response->paginator($comments, new CommentTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = $this->comment->create($request->all());
        return $this->response->item($comment, new CommentTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comment = $this->comment->where('id', $id)->where('user_id', $this->user()->id)->firstOrFail();
        $comment->update($request->except('author'));
        return $this->response->item($comment, new CommentTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = $this->comment->where('id', $id)->where('user_id', $this->user()->id)->firstOrFail();
        $comment->destroy();
        return response()->json(true);
    }
}
