<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Language;
use League\Fractal\TransformerAbstract;

class LanguageTransformer extends TransformerAbstract
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
     * @param Language $language
     * @return array
     */
    public function transform(Language $language)
    {
        return $language->toArray();
    }



}