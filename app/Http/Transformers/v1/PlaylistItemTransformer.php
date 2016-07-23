<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\PlaylistItem;
use League\Fractal\TransformerAbstract;

class PlaylistItemTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['playlist', 'project'];

    /**
     * Turn this item object into a generic array
     *
     * @param PlaylistItem $playlistItem
     * @return array
     */
    public function transform(PlaylistItem $playlistItem)
    {
        //$items->load('item');
        return $playlistItem->toArray();
    }

    public function includePlaylist(PlaylistItem $playlistItem)
    {
        $playlist = $playlistItem->playlist;
        if($playlist)
            return $this->item($playlist, new PlaylistTransformer);
    }

    public function includeProject(PlaylistItem $playlistItem)
    {
        $project = $playlistItem->project;
        if($project)
            return $this->item($project, new ProjectTransformer);
    }


}