<?php namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class CommentFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relatedModel => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];
}
