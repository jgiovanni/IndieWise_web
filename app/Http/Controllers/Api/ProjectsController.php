<?php

namespace IndieWise\Http\Controllers\Api;

use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Requests;
use IndieWise\Http\Transformers\v1\ProjectTransformer;
use IndieWise\Project;
use Dingo\Api\Contract\Http\Request;


class ProjectsController extends Controller
{
    private $project;

    public function __construct(Project $project)
    {
        $this->middleware('api.auth', ['only' => ['create', 'store', 'update', 'destroy']]);
        $this->project = $project;
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
        $projects = $this->project->filter($request->all())->paginate($request->get('per_page', 10));
        return $this->response->paginator($projects, new ProjectTransformer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Dingo\Api\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Dingo\Api\Http\Response
     */
    public function show($id)
    {
        //
        $project = $this->project->whereId($id)->orWhere('url_id', $id)->firstOrFail();
        return $this->response->item($project, new ProjectTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Dingo\Api\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Dingo\Api\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
