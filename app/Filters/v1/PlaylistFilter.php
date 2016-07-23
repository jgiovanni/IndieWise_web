<?php namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class PlaylistFilter extends ModelFilter
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
        return $this->where('user_id', $user);
    }
}
