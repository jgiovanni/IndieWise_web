<?php

namespace App\Http\Controllers\Api;


use Dingo\Api\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Transformers\v1\PlaylistItemTransformer;
use App\Playlist;
use App\PlaylistItem;

class PlaylistItemsController extends Controller
{
    private $item;

    public function __construct(PlaylistItem $item)
    {
        $this->item = $item;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = $this->item->filter($request->all())->get();
        return $this->response->collection($items, new PlaylistItemTransformer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = $this->item->create($request->all());
        return response()->json(compact('item'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = $this->item->firstOrFail($id);
        return response()->json(compact('item'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function checkIn($id)
    {
        $item = $this->item->whereIn('project_id', $id)->firstOrFail();
        return response()->json(compact('item'));
    }
}
