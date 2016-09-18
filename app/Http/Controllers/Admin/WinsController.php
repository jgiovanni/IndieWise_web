<?php

namespace IndieWise\Http\Controllers\Admin;

use Dingo\Api\Contract\Http\Request;

use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\NominationTransformer;
use IndieWise\Http\Transformers\v1\WinTransformer;
use IndieWise\Win;
use League\Fractal\Serializer\DataArraySerializer;
use Yajra\Datatables\Facades\Datatables;

class WinsController extends Controller
{

    private $win;

    public function __construct(Win $win)
    {
        $this->middleware('api.auth', ['only' => ['create', 'store', 'update', 'destroy']]);
        $this->win = $win;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('datatable')) {
            $wins = $this->win->filter($request->all())->get();
            return Datatables::of($wins)->setTransformer(WinTransformer::class)->setSerializer(DataArraySerializer::class)->make(true);
        }
        $wins = $this->win->filter($request->all())->paginate($request->get('per_page', 50));
        return $this->response->paginator($wins, new WinTransformer);
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
