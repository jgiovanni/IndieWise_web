<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Reaction;
use League\Fractal\TransformerAbstract;

class ReactionTransformer extends TransformerAbstract
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
     * @param Reaction $reaction
     * @return array
     */
    public function transform(Reaction $reaction)
    {
        return $reaction->toArray();
    }

    /**
     * Include Project
     *
     * @param Reaction $reaction
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Reaction $reaction)
    {
        $project = $reaction->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Reaction $reaction
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Reaction $reaction)
    {
        $user = $reaction->user;
        if($user)
            return $this->item($user, new UserTransformer);

    }


}