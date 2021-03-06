<?php namespace App\Filters\v1;

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

    public function critique($critique)
    {
        return $this->where('critique_id', $critique);
    }

    public function comment($comment)
    {
        return $this->where('comment_id', $comment);
    }

    public function replies($replies)
    {
        return (boolean)$replies ? $this->whereNull('comment_id') : $this->whereNotNull('comment_id');
    }

    public function author($author)
    {
        return $this->where('author_id', $author);
    }


}
