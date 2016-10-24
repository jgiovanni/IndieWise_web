<?php

namespace App\Http\Transformers\v1;


use App\Critique;
use League\Fractal\TransformerAbstract;

class CritiqueTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'user', 'comments'];

    /**
     * Turn this item object into a generic array
     *
     * @param Critique $critique
     * @return array
     */
    public function transform(Critique $critique)
    {
        return $critique->toArray();
    }

    /**
     * Include Project
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Critique $critique)
    {
        $project = $critique->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Critique $critique)
    {
        $user = $critique->user;
        if($user)
            return $this->item($user, new UserTransformer);

    }

    /**
     * Include Comments
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeComments(Critique $critique)
    {
        $comments = $critique->comments->take(1);
        if($comments)
            return $this->collection($comments, new CommentTransformer);

    }



}