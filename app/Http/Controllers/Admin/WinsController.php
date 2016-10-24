<?php

namespace App\Http\Controllers\Admin;

use Dingo\Api\Contract\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Transformers\v1\NominationTransformer;
use App\Http\Transformers\v1\WinTransformer;
use App\Win;
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
        $win = $this->win->findOrFail($id);
        return $this->response->item($win, new WinTransformer);
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
        $win = $this->win->findOrFail($id);
        $win->update($request->except('nominations', 'nominations_count', 'project', 'owner', 'award'));
        return $this->response->item($win, new WinTransformer);
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
