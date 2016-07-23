<?php

namespace IndieWise\Http\Transformers\v1;


use IndieWise\Genre;
use IndieWise\Playlist;
use League\Fractal\TransformerAbstract;

class PlaylistTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['playlistItems', 'user'];

    /**
     * Turn this item object into a generic array
     *
     * @param Playlist $playlist
     * @return array
     */
    public function transform(Playlist $playlist)
    {
        //$items->load('item');
        return $playlist->toArray();
    }

    public function includePlaylistItems(Playlist $playlist)
    {
        $playlistItems = $playlist->playlistItems;
        if($playlistItems)
            return $this->collection($playlistItems, new PlaylistItemTransformer);
    }

    public function includeUser(Playlist $playlist)
    {
        $user = $playlist->user;
        if($user)
            return $this->collection($user, new UserTransformer);
    }


}