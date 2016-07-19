<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Win;
use League\Fractal\TransformerAbstract;

class WinTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'award', 'actions'];

    /**
     * Turn this item object into a generic array
     *
     * @param Win $win
     * @return array
     */
    public function transform(Win $win)
    {
        return $win->toArray();
    }

    /**
     * Include Project
     *
     * @param Win $win
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Win $win)
    {
        $project = $win->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Win $win
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Win $win)
    {
        $user = $win->user;
        if($user)
            return $this->item($user, new UserTransformer);

    }

    /**
     * Include Award
     *
     * @param Win $win
     * @return \League\Fractal\Resource\Item
     */
    public function includeAward(Win $win)
    {
        $award = $win->award;
        if($award)
            return $this->item($award, new AwardTransformer);

    }

    /**
     * Include Critique
     *
     * @param Win $win
     * @return \League\Fractal\Resource\Item
     */
    public function includeCritique(Win $win)
    {
        $critique = $win->critique;
        if($critique)
            return $this->item($critique, new CritiqueTransformer);

    }


}