<?php

namespace App\Http\Transformers\v1;


use App\Genre;
use App\SelectedGenres;
use League\Fractal\TransformerAbstract;

class SelectedGenresTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['genres'];

    /**
     * Turn this item object into a generic array
     *
     * @param SelectedGenres $genres
     * @return array
     */
    public function transform(SelectedGenres $genres)
    {
        $genres->load('genre');
        return $genres->toArray();
    }

    public function includeGenre(SelectedGenres $genres)
    {
        $genre = $genres->genre;
        if($genre)
            return $this->item($genre, new GenreTransformer);
    }


}