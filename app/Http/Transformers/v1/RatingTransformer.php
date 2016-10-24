<?php

namespace App\Http\Transformers\v1;


use App\Rating;
use League\Fractal\TransformerAbstract;

class RatingTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'author'];

    /**
     * Turn this item object into a generic array
     *
     * @param Rating $rating
     * @return array
     */
    public function transform(Rating $rating)
    {
        return $rating->toArray();
    }

    /**
     * Include Project
     *
     * @param Rating $rating
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Rating $rating)
    {
        $project = $rating->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Rating $rating
     * @return \League\Fractal\Resource\Item
     */
    public function includeAuthor(Rating $rating)
    {
        $author = $rating->author;
        if($author)
            return $this->item($author, new UserTransformer);

    }


}