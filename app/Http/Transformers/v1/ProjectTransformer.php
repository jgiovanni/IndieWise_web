<?php

namespace App\Http\Transformers\v1;


use Carbon\Carbon;
use App\Project;
use League\Fractal\ParamBag;
use League\Fractal\TransformerAbstract;

class ProjectTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = [
        'owner', 'filmingCountry', 'language', 'type', 'critiques', 'genres', 'wins', 'reactions', 'nominations',
        'ratings', 'actions', 'watches'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param Project $project
     * @return array
     */
    public function transform(Project $project)
    {
        $p = $project->toArray();
        $p['completionDate'] = (string) Carbon::parse($project->completionDate)->year;

        return $p;
    }

    /**
     * Include Owner
     *
     * @param Project $project
     * @return \League\Fractal\Resource\Item
     */
    public function includeOwner(Project $project)
    {
        $owner = $project->owner;
//        dd($owner);
        if($owner)
            return $this->item($owner, new UserTransformer);

    }

    public function includeFilmingCountry(Project $project)
    {
        $fc = $project->filmingCountry_id;
        if($fc)
            return $this->item($fc, new CountryTransformer);

    }

    public function includeLanguage(Project $project)
    {
        $language = $project->language;
        if($language)
            return $this->item($language, new LanguageTransformer);

    }

    public function includeType(Project $project)
    {
        $type = $project->type;
        if($type)
            return $this->item($type, new TypeTransformer);

    }

    public function includeGenres(Project $project)
    {
        $genres = $project->genres;
        if($genres)
            return $this->collection($genres, new SelectedGenresTransformer);

    }

    /*public function includeCritiques(Project $project)
    {
        $critiques = $project->critiques;
        if($critiques)
            return $this->item($critiques, new UserTransformer);

    }*/
}