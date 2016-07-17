<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Critique;
use League\Fractal\TransformerAbstract;

class CritiqueTransformer extends TransformerAbstract
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
     * @param Critique $critique
     * @return array
     */
    public function transform(Critique $critique)
    {
        return $critique->toArray();
    }



}