<?php

namespace IndieWise\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Requests;
use IndieWise\Http\Transformers\v1\ProjectTransformer;
use IndieWise\Project;
use Dingo\Api\Contract\Http\Request;
use IndieWise\Http\Requests\v1\ProjectRequest;
use IndieWise\Watch;


class ProjectsController extends Controller
{
    private $project;

    public function __construct(Project $project)
    {
        $this->middleware('api.auth', ['only' => ['store', 'update', 'destroy']]);
//        $this->middleware('jwt.refresh', ['only' => ['store', 'update', 'destroy']]);
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
        $user = $this->auth->user();
        if ($request->has('owner') && !is_null($user) && ($request->get('owner') == $user->id)) {
            $projects = $this->project->filter($request->all())->withCount('upRatings', 'downRatings', 'wins', 'critiques', 'nominations', 'reactions')->paginate($request->get('per_page', 10));
        } else {
            $projects = $this->project->listed()->filter($request->all())->withCount('upRatings', 'downRatings', 'wins', 'critiques', 'nominations', 'reactions')->paginate($request->get('per_page', 10));
        }
        return $this->response->paginator($projects, new ProjectTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\ProjectRequest|ProjectRequest $request
     * @return \Dingo\Api\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        /*if($this->isMethod('post')) {
            return ($this->user()->projects()->count() <= 3);
        }*/
        if ($this->user()->projects->count() >= 3) {
            return response()->json(['status' => 'failed', 'reason' => 'Upload limit reached'], 403);
        }

        $project = $this->project->create($request->except('genres'));

        $project->syncGenres($request->get('genres'));

        return $this->response->item($project, new ProjectTransformer);

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
        $project = $this->project->whereId($id)->orWhere('url_id', $id)->withCount('upRatings', 'downRatings', 'wins', 'critiques', 'nominations', 'reactions')->firstOrFail();
        return $this->response->item($project, new ProjectTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\ProjectRequest|ProjectRequest $request
     * @param  int $id
     * @return \Dingo\Api\Http\Response
     */
    public function update(ProjectRequest $request, $id)
    {
        $project = $this->project->where('id', $id)->where('owner_id', $this->user()->id)->firstOrFail();
        $project->update($request->except('genres', 'owner', 'language', 'type', 'filming_country', 'up_ratings_count', 'down_ratings_count', 'wins_count', 'critiques_count', 'nominations_count', 'reactions_count'));
        $project->syncGenres($request->get('genres'));
        return $this->response->item($project, new ProjectTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Dingo\Api\Http\Response
     */
    public function destroy($id)
    {
        $project = $this->project->where('id', $id)->where('owner_id', $this->user()->id)->firstOrFail();
        $project->delete();
        return response()->json(true);
    }

    public function recentlyWatched()
    {
        $watched = DB::select('SELECT * FROM `Watched` w LEFT JOIN (SELECT p.id, p.name AS projectName, p.url_id AS projectUrlId, p.thumbnail_url AS projectThumbnail FROM Project p ) as project ON project.id = w.project_id WHERE (w.project_id IN ( SELECT Project.id FROM Project WHERE Project.unlist = false ) AND w.count > 0 ) ORDER BY w.updated_at DESC LIMIT 7');
        return response()->json($watched);
    }

    public function recordWatched(Request $request)
    {
        $watch = Watch::firstOrCreate(['project_id' => $request->get('project_id')]);
        DB::table('Watched')->where('project_id', $watch->project_id)->increment('count');
    }

    public function canUpload()
    {
        return response()->json(['status' => $this->user()->projects->count() < 3]);
    }

    public function count()
    {
        //
        $projects = $this->project->all('id')->count();
        return response()->json($projects);
    }


}
