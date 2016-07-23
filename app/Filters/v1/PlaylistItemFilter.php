<?php namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class PlaylistItemFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relatedModel => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function playlist($playlist)
    {
        $user_id = app('Dingo\Api\Auth\Auth')->user()->id;
        return $this->whereHas('playlist', function ($query) use ($playlist, $user_id) {
            return $query->where('id', $playlist)->where('user_id', $user_id);
        });
    }

    public function playlists($playlists)
    {
        $user_id = app('Dingo\Api\Auth\Auth')->user()->id;
        return $this->whereHas('playlist', function ($query) use ($playlists, $user_id) {
            return $query->whereIn('id', explode(',', $playlists))->where('user_id', $user_id);
        });
    }

    public function project($project)
    {
        return $this->where('project_id', $project);
    }
}
