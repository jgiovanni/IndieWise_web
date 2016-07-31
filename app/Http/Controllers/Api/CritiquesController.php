<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;

use Illuminate\Support\Facades\DB;
use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\CritiqueTransformer;
use IndieWise\Critique;
use IndieWise\Nomination;

class CritiquesController extends Controller
{

    private $critique;

    public function __construct(Critique $critique)
    {
        $this->middleware('api.auth', ['only' => ['store', 'update', 'destroy']]);
        $this->critique = $critique;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return \Dingo\Api\Http\Response
     */
    public function index(Request $request)
    {
        $critiques = $this->critique->filter($request->all())->withCount('comments')->paginate($request->get('per_page', 50));
        return $this->response->paginator($critiques, new CritiqueTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $critique = Critique::create($request->except('include'));
        return $this->response->item($critique, new CritiqueTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $critique = $this->critique->whereId($id)->orWhere('url_id', $id)->withCount('comments')->firstOrFail();
        return $this->response->item($critique, new CritiqueTransformer);
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
        $critique = $this->critique->where('id', $id)->where('user_id', $this->user()->id)->firstOrFail();
        $critique->update($request->except('project', 'user'));
        return $this->response->item($critique, new CritiqueTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $critique = $this->critique->where('id', $id)->where('user_id', $this->user()->id)->firstOrFail();
        $critique->destroy();
        return response()->json(true);
    }

    public function latest()
    {
        $critiques = DB::select('SELECT c.id, c.created_at, c.url_id, c.overall, c.user_id, author.userFullName, author.userUrlId, author.userAvatar, c.project_id, project.projectName, project.projectUrlId, project.projectThumbnail FROM Critique c LEFT JOIN ( SELECT p.id, p.name AS projectName, p.url_id AS projectUrlId, p.thumbnail_url AS projectThumbnail FROM Project p WHERE p.unlist IS FALSE) AS project ON project.id = c.project_id LEFT JOIN ( SELECT u.id, CONCAT(u.firstName, \' \', u.lastName) AS userFullName, u.url_id AS userUrlId, u.avatar AS userAvatar FROM users u) AS author ON author.id = c.user_id ORDER BY c.created_at DESC LIMIT 6');
        return response()->json($critiques);
    }

}
