<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Comment;
use League\Fractal\TransformerAbstract;

class CommentTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'user'];

    /**
     * Turn this item object into a generic array
     *
     * @param Comment $comment
     * @return array
     */
    public function transform(Comment $comment)
    {
        return $comment->toArray();
    }

    /**
     * Include Project
     *
     * @param Comment $comment
     * @return \League\Fractal\Resource\Item
     */
    public function includeCritique(Comment $comment)
    {
        $critique = $comment->critique;
        if($critique)
            return $this->item($critique, new CritiqueTransformer);

    }

    /**
     * Include User
     *
     * @param Comment $comment
     * @return \League\Fractal\Resource\Item
     */
    public function includeAuthor(Comment $comment)
    {
        $author = $comment->author;
        if($author)
            return $this->item($author, new UserTransformer);

    }

    /**
     * Include User
     *
     * @param Comment $comment
     * @return \League\Fractal\Resource\Item
     */
    public function includeComment(Comment $comment)
    {
        $parentComment = $comment->comment;
        if($parentComment)
            return $this->item($parentComment, new CommentTransformer);

    }

    /**
     * Include User
     *
     * @param Comment $comment
     * @return \League\Fractal\Resource\Item
     */
    public function includeReplies(Comment $comment)
    {
        $replies = $comment->replies;
        if($replies)
            return $this->collection($replies, new CommentTransformer);

    }



}