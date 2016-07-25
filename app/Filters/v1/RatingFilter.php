<?php namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class RatingFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relatedModel => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function user($user)
    {
        return $this->where('author_id', $user);
    }

    public function notUser($user)
    {
        return $this->where('author_id', '<>', $user)
            ->whereHas('project', function ($query) use ($user) {
                $query->where('owner_id', $user);
            });
    }

    public function project($project)
    {
        return $this->where('project_id', $project);
    }

    public function notProject($project)
    {
        return $this->where('project_id', '<>', $project);
    }

}
