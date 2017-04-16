<?php

namespace App\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;

use App\Award;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Win;
use App\Winner;

class WinnersController extends Controller
{
    // private $winner;

    public function __construct()
    {
//        $this->middleware('api.auth', ['only' => ['create', 'store', 'update', 'destroy']]);
        // $this->winner = $winner;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $awards = Award::with(['winners' => function ($query) use ($request) {
            $query->whereHas('win', function ($q) use ($request) {
                $q->where('award_win.created_at', '>=', $request->get('date_start'))
                    ->where('award_win.created_at', '<', $request->get('date_end'));
            });
        }, 'winners.project'])/*->withCount(['wins' => function ($query) {
            $query
                ->where('award_win.created_at', '>=', '2016-09-01 00:00:00')
                ->where('award_win.created_at', '<', '2016-10-01 00:00:00');

        }])*/->orderBy('name', 'asc')->get();

        return $awards;
//        return $this->response($awards);

    }

    public function assignWinners()
    {
        $wins = Win::where('created_at', '>=', '2016-10-01 00:00:00')->where('created_at', '<', '2016-11-01 00:00:00')->doesntHave('winner')->get();
        return $wins;
        $wins->each(function ($win) {
            Winner::create([
                'project_id' => $win->project_id,
                'award_id' => $win->award_id,
                'owner_id' => $win->owner_id,
                'win_id' => $win->id,
            ]);
        });

    }

}
