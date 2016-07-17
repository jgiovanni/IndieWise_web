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



}