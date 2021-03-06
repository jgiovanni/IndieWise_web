<?php

namespace App\Http\Controllers\Admin;

use Dingo\Api\Contract\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Transformers\v1\NominationTransformer;
use App\Nomination;
use League\Fractal\Serializer\DataArraySerializer;
use Yajra\Datatables\Facades\Datatables;

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
        if ($request->has('datatable')) {
            $nominations = $this->nomination->filter($request->all())->get();
            return Datatables::of($nominations)->setTransformer(NominationTransformer::class)->setSerializer(DataArraySerializer::class)->make(true);
        }
        $nominations = $this->nomination->filter($request->all())->paginate($request->get('per_page', 50));
        return $this->response->paginator($nominations, new NominationTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $nom = Nomination::create($request->all());
        return $this->response->item($nom, new NominationTransformer);
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
    
    public function latest()
    {
        $nominations = DB::select('SELECT nom.id, nom.created_at, nom.award_id, award.awardName, nom.user_id, nominator.userFullName, nominator.userUrlId, nominator.userAvatar, nom.project_id, project.projectName, project.projectUrlId, project.projectThumbnail FROM nominations nom LEFT JOIN ( SELECT p.id, p.name AS projectName, p.url_id AS projectUrlId, p.thumbnail_url AS projectThumbnail, p.unlist FROM projects p) AS project ON project.id = nom.project_id LEFT JOIN ( SELECT u.id, CONCAT(u.firstName, \' \', u.lastName) AS userFullName, u.url_id AS userUrlId, u.avatar AS userAvatar FROM users u) AS nominator ON nominator.id = nom.user_id LEFT JOIN (SELECT aw.id, aw.name AS awardName FROM Award aw) AS award ON award.id = nom.award_id WHERE project.unlist = FALSE ORDER BY nom.created_at DESC LIMIT 6');
        return response()->json($nominations);
    }
}
