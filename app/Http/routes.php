<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use GetStream\Stream\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\App;
use IndieWise\Country;
use IndieWise\Project;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

$dispatcher = app('Dingo\Api\Dispatcher');

Route::get('', function (){
    return view('welcome');
});

Route::get('test', function () {
    //Find project
    $project = Project::with('wins.award')->whereHas('wins', function ($query) {
        $query->where('award_id', '6950ef19-1cce-11e6-b1e1-e12b04098a26');
    }, '=', 0)->whereHas('nominations', function ($query) {
        $query->where('award_id', '6950ef19-1cce-11e6-b1e1-e12b04098a26');
    }, '>=', 5)->find('1108b3f2-2cd5-11e6-9f2e-df967fc712f1');

    if (!is_null($project)) {
        //Award win to project
        $project->wins()->create([
            'award_id' => '6950ef19-1cce-11e6-b1e1-e12b04098a26',
            'owner_id' => $project->owner_id,
        ]);
    }
    return $project;
});


//Route::group(['middleware' => 'web'], function () {
//    Route::get('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::post('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::get('auth/{provider?}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');
//});

Route::get('verification/error', 'Auth\AuthController@getVerificationError');
Route::get('verification/{token}', 'Auth\AuthController@getVerification');

Route::any('alpha/{path?}', function() use ($dispatcher) {
    $countries = Country::orderBy('name', 'desc')->get();

    if (App::environment('local')) {
        return view("dev", compact('countries'));
    } else {
        $ua = request()->server('HTTP_USER_AGENT');

        if (preg_match('/facebookexternalhit/[0-9]|Facebot|Twitterbot|Pinterest|Google.*snippet/i', $ua)) {
            $segments = request()->segments();
            try {
                $project = $dispatcher->get('projects/' . end($segments));
            } catch (Dingo\Api\Exception\InternalHttpException $e) {
                $response = $e->getResponse();
            } catch (NotFoundHttpException $e) {
                return redirect('alpha/404');
                $response = $e->getResponse();
            } catch (ModelNotFoundException $e) {
                return redirect('alpha/404');
                $response = $e;
            }
            return view("hard-video", compact('project', 'countries'));
        } else
            return view("index", compact('countries'));
    }
})->where("path", ".+");

/*
Route::get('/', function () {
    return view('welcome');
});

Route::get('/logout', function () {
    //Auth::logout();
    $user = Auth::user();
    return response()->json($user);
});
Route::auth();

Route::get('/home', 'HomeController@index');*/