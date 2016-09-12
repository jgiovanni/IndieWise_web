<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;
use Illuminate\Support\Facades\DB;
use IndieWise\Http\Requests;
use IndieWise\Http\Requests\v1\UserRequest;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Transformers\v1\UserTransformer;
use IndieWise\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class UsersController extends Controller
{

    private $user;
    
    public function __construct(User $user)
    {
        $this->middleware('api.auth', ['except' => ['show', 'count', 'countUserStats']]);
//        $this->middleware('jwt.refresh', ['except' => ['show', 'count']]);
        $this->user = $user;
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
        $users = $this->user->filter($request->all())->paginate($request->get('per_page', 8));
        return $this->response->paginator($users, new UserTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $user = $this->user->whereId($id)->orWhere('url_id', $id)->with('genres', 'country', 'types')->firstOrFail();
        return $this->response->item($user, new UserTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request|\Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        $user = $this->user->findOrFail($id);

        $user->update($request->except('genres', 'country', 'types', 'user_id', 'user_hash', 'app_id', 'password_confirmation'));
        if( $request->has('genres') && count($request->get('genres')) > 0 && !is_array($request->get('genres')[0]) ) {
            $user->syncGenres($request->get('genres'));
        }
        if( $request->has('types') && count($request->get('types')) > 0 && !is_array($request->get('types')[0]) ) {
            $user->syncTypes($request->get('types'));
        }
        /*if( $request->has('settings')) {
            $user->syncSettings($request->get('settings'));
        }*/
        return $this->response->item($user->load('genres', 'country', 'types'), new UserTransformer);
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

    public function count()
    {
        //
        $users = User::all('id')->count();
        return response()->json($users);
    }

    public function countUserStats($id = null)
    {
        if (is_null($id)) {
            $me = JWTAuth::parseToken()->toUser();
            $id = $me->id;
        }

        $user = DB::select('SELECT u.id, '.
            'COALESCE(project.projectCount,0) AS projectCount, COALESCE(critiqueA.critiqueCount+critiqueB.critiqueCount,0) AS critiqueCount, ' .
            'COALESCE(reactionA.reactionCount+reactionB.reactionCount,0) AS reactionCount, COALESCE(award.winCount,0) AS winCount ' .
            'FROM users AS u '.
            'LEFT JOIN ( SELECT COUNT(id) AS projectCount, owner_id AS uId FROM Project WHERE deleted_at IS NULL GROUP BY owner_id) AS project ON project.uId = u.id '.
            'LEFT JOIN ( SELECT COUNT(id) AS critiqueCount, project_id, user_id AS uId FROM Critique WHERE user_id = \''.$id.'\' ) AS critiqueA ON critiqueA.uId = u.id ' .
            'LEFT JOIN ( SELECT COUNT(id) AS critiqueCount, project_id, user_id AS uId FROM Critique WHERE project_id IN (SELECT p.id FROM Project p WHERE p.owner_id = \''.$id.'\') ) AS critiqueB ON critiqueB.project_id IN (SELECT p.id FROM Project p WHERE p.owner_id = u.id) ' .
            'LEFT JOIN ( SELECT COUNT(id) AS reactionCount, project_id , user_id AS uId FROM Reaction WHERE user_id = \''.$id.'\' ) AS reactionA ON reactionA.uId = u.id ' .
            'LEFT JOIN ( SELECT COUNT(id) AS reactionCount, project_id , user_id AS uId FROM Reaction WHERE project_id IN (SELECT p.id FROM Project p WHERE p.owner_id = \''.$id.'\') ) AS reactionB ON reactionB.project_id IN (SELECT p.id FROM Project p WHERE p.owner_id = u.id) ' .
            'LEFT JOIN ( SELECT COUNT(id) AS winCount, project_id FROM AwardWin GROUP BY project_id ) AS award ON award.project_id IN ( SELECT p.id FROM Project p WHERE p.owner_id = u.id GROUP BY p.id ) ' .
            'WHERE (u.id = \''.$id.'\') GROUP BY u.id ORDER BY u.id DESC');
        return response()->json($user[0]);


    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->toUser();
            return response()->json($user);
        } catch (JWTException $e) {
            //return response()->json($e);
        }
    }
}
