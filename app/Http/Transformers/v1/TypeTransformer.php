<?php

namespace App\Http\Transformers\v1;


use App\Type;
use League\Fractal\TransformerAbstract;

class TypeTransformer extends TransformerAbstract
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
     * @param Type $type
     * @return array
     */
    public function transform(Type $type)
    {
        return $type->toArray();
    }



}