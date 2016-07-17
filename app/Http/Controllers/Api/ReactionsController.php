<?php

namespace IndieWise\Http\Controllers\Api;

use Illuminate\Http\Request;

use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\ReactionTransformer;
use IndieWise\Reaction;

class ReactionsController extends Controller
{

    private $reaction;

    public function __construct(Reaction $reaction)
    {
        $this->middleware('api.auth', ['only' => ['create', 'store', 'update', 'destroy']]);
        $this->reaction = $reaction;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return \Dingo\Api\Http\Response
     */
    public function index(Request $request)
    {
        //
        $reactions = $this->reaction->filter($request->all())->paginate($request->get('per_page', 300));
        return $this->response->paginator($reactions, new ReactionTransformer);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}
