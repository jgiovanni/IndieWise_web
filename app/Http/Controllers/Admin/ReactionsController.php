<?php

namespace IndieWise\Http\Controllers\Admin;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $reaction = Reaction::create($request->all());
        return $this->response->item($reaction, new ReactionTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reaction = $this->reaction->whereId($id)->firstOrFail();
        return $this->response->item($reaction, new ReactionTransformer);
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
        $reaction = $this->reaction->findOrFail($id);
        $reaction->update($request->all());
        return $this->response->item($reaction, new ReactionTransformer);
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


    public function latest()
    {
//        $reactions = Reaction::with('project', 'user')->whereHas('project', function ($query) { $query->where('unlist', 0); })->orderBy('created_at', 'DESC')->take(6)->get();
        $reactions = DB::select('SELECT r.id, r.created_at, r.emotion, r.user_id, reactor.userFullName, reactor.userUrlId, reactor.userAvatar, r.project_id, project.projectName, project.projectUrlId, project.projectThumbnail FROM Reaction r LEFT JOIN ( SELECT p.id, p.name AS projectName, p.url_id AS projectUrlId, p.thumbnail_url AS projectThumbnail, p.unlist FROM Project p ) AS project ON project.id = r.project_id LEFT JOIN ( SELECT u.id, CONCAT(u.firstName, \' \', u.lastName) AS userFullName, u.url_id AS userUrlId, u.avatar AS userAvatar FROM users u) AS reactor ON reactor.id = r.user_id WHERE project.unlist = FALSE ORDER BY r.created_at DESC LIMIT 6');
        return response()->json($reactions);
    }
}
