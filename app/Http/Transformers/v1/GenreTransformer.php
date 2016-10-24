<?php

namespace App\Http\Transformers\v1;


use App\Genre;
use League\Fractal\TransformerAbstract;

class GenreTransformer extends TransformerAbstract
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
     * @param Genre $genre
     * @return array
     */
    public function transform(Genre $genre)
    {
        return $genre->toArray();
    }



}