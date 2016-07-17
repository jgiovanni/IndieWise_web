<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Country;
use League\Fractal\TransformerAbstract;

class CountryTransformer extends TransformerAbstract
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
     * @param Country $country
     * @return array
     */
    public function transform(Country $country)
    {
        return $country->toArray();
    }



}