<?php

namespace IndieWise\Http\Controllers\Api;

use Dingo\Api\Contract\Http\Request;

use IndieWise\Award;
use IndieWise\Http\Requests;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Win;
use IndieWise\Winner;

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
        $awards = Award::with(['winners' => function ($query) {
            $query->whereHas('win', function ($q) {
                $q->where('AwardWin.created_at', '>=', '2016-09-01 00:00:00')
                    ->where('AwardWin.created_at', '<', '2016-10-01 00:00:00');
            });
        }, 'winners.project'])/*->withCount(['wins' => function ($query) {
            $query
                ->where('AwardWin.created_at', '>=', '2016-09-01 00:00:00')
                ->where('AwardWin.created_at', '<', '2016-10-01 00:00:00');

        }])*/->orderBy('name', 'asc')->get();

        return $awards;
//        return $this->response($awards);

    }

    public function assignWinners()
    {
        $wins = Win::where('created_at', '>=', '2016-09-01 00:00:00')->where('created_at', '<', '2016-10-01 00:00:00')->doesntHave('winner')->get();
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
