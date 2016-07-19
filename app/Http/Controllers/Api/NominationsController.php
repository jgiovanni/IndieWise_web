<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;

use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\NominationTransformer;
use IndieWise\Nomination;

class NominationsController extends Controller
{

    private $nomination;

    public function __construct(Nomination $nomination)
    {
        $this->middleware('api.auth', ['only' => ['create', 'store', 'update', 'destroy']]);
        $this->nomination = $nomination;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $nominations = $this->nomination->filter($request->all())->paginate($request->get('per_page', 50));
        return $this->response->paginator($nominations, new NominationTransformer);
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
        $nomination = $this->nomination->whereId($id)->firstOrFail();
        return $this->response->item($nomination, new NominationTransformer);

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
