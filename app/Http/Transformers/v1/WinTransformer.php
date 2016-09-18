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
    protected $availableIncludes = ['project', 'owner', 'nominations', 'award', 'actions'];

    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = [
        'award', 'project'
    ];
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
    public function includeOwner(Win $win)
    {
        $owner = $win->owner;
        if($owner)
            return $this->item($owner, new UserTransformer);

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
    public function includeNominations(Win $win)
    {
        $nominations = $win->nominations;
        if($nominations)
            return $this->item($nominations, new NominationTransformer);

    }


}