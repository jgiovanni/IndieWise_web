<?php

namespace App\Http\Transformers\v1;


use App\Award;
use League\Fractal\TransformerAbstract;

class AwardTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = [];

    /**
     * Turn this item object into a generic array
     *
     * @param Award $award
     * @return array
     */
    public function transform(Award $award)
    {
        return $award->toArray();
    }



}