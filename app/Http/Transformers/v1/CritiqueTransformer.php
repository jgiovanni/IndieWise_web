<?php

namespace App\Http\Transformers\v1;


use App\Critique;
use League\Fractal\ParamBag;
use League\Fractal\TransformerAbstract;

class CritiqueTransformer extends TransformerAbstract
{
    /**
     * List of resources to possibly include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'user', 'comments'];

//    protected $defaultIncludes = [];

    private $validParams = ['limit', 'order'];

    /**
     * Turn this item object into a generic array
     *
     * @param Critique $critique
     * @return array
     */
    public function transform(Critique $critique)
    {
        return $critique->toArray();
    }

    /**
     * Include Project
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeProject(Critique $critique)
    {
        $project = $critique->project;
        if($project)
            return $this->item($project, new ProjectTransformer);

    }

    /**
     * Include User
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Critique $critique)
    {
        $user = $critique->user;
        if($user)
            return $this->item($user, new UserTransformer);

    }

    /**
     * Include Comments
     *
     * @param Critique $critique
     * @return \League\Fractal\Resource\Item
     */
    public function includeComments(Critique $critique, ParamBag $params = null)
    {
        if ($params === null) {
            $comments = $critique->comments;
            if ($comments)
                return $this->collection($comments, new CommentTransformer);
            return [];
        }


        // Optional params validation
        $usedParams = array_keys(iterator_to_array($params));
        if ($invalidParams = array_diff($usedParams, $this->validParams)) {
            throw new \Exception(sprintf(
                'Invalid param(s): "%s". Valid param(s): "%s"',
                implode(',', $usedParams),
                implode(',', $this->validParams)
            ));
        }

        // Processing
        list($limit, $offset) = $params->get('limit');
        list($orderCol, $orderBy) = $params->get('order');

        $comments = $critique->comments
//            ->offset($offset)
            ->where('comment_id', null)
            ->sortByDesc('created_at')
            ->take($limit);
//            ->orderBy($orderCol, $orderBy);
        if ($comments)
            return $this->collection($comments, new CommentTransformer);

    }
}