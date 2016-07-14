<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Project;
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
        return $project->toArray();
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
        return $this->item($owner, new UserTransformer);
    }

    public function includeFilmingCountry(Project $project)
    {
        $fc = $project->filmingCountry;
        return $this->item($fc, new UserTransformer);
    }

    public function includeLanguage(Project $project)
    {
        $language = $project->language;
        return $this->item($language, new UserTransformer);
    }

    public function includeType(Project $project)
    {
        $type = $project->type;
        return $this->item($type, new UserTransformer);
    }

    public function includeCritiques(Project $project)
    {
        $critiques = $project->critiques;
        return $this->item($critiques, new UserTransformer);
    }
}