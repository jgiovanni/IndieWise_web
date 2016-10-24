<?php

namespace App\Http\Transformers\v1;


use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = [
        'country', 'projects', 'comments', 'playlists', 'critiques', 'genres', 'wins', 'reactions', 'nominations',
        'ratings', 'actions', 'watches'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param User $user
     * @return array
     */
    public function transform(User $user)
    {
        return $user->toArray();
    }

    public function includeCountry(User $user)
    {
        $country = $user->country;
        if($country)
            return $this->item($country, new CountryTransformer);
    }

    public function includeGenres(User $user)
    {
        $genres = $user->genres;
        if($genres)
            return $this->item($genres, new GenreTransformer);
    }




}