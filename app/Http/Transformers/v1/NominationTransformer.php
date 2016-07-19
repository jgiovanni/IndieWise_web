<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Nomination;
use League\Fractal\TransformerAbstract;

class NominationTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'user', 'award', 'critique'];

    /**
     * Turn this item object into a generic array
     *
     * @param Nomination $nomination
     * @return array
     */
    public function transform(Nomination $nomination)
    {
        return $nomination->toArray();
    }

    /**
     * Include Project
     *
     * @param Nomination $nomination
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Nomination $nomination)
    {
        $project = $nomination->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Nomination $nomination
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Nomination $nomination)
    {
        $user = $nomination->user;
        if($user)
            return $this->item($user, new UserTransformer);

    }

    /**
     * Include Award
     *
     * @param Nomination $nomination
     * @return \League\Fractal\Resource\Item
     */
    public function includeAward(Nomination $nomination)
    {
        $award = $nomination->award;
        if($award)
            return $this->item($award, new AwardTransformer);

    }

    /**
     * Include Critique
     *
     * @param Nomination $nomination
     * @return \League\Fractal\Resource\Item
     */
    public function includeCritique(Nomination $nomination)
    {
        $critique = $nomination->critique;
        if($critique)
            return $this->item($critique, new CritiqueTransformer);

    }


}