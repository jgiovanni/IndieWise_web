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

//use Dingo\Api\Auth\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use GetStream\Stream\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Country;
use App\Project;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Vinkla\Hashids\Facades\Hashids;

$dispatcher = app('Dingo\Api\Dispatcher');

Route::group(['prefix' => 'console'], function () use ($dispatcher) {
//    dd(Auth::user());
    Route::any('{path?}', function() {
        if (App::environment('local')) {
            return view("admin_dev");
        } else return view("admin");
    })->where("path", ".+");
});

/*Route::get('fire', function () {
    // this fires the event
    event(new IndieWise\Events\EventName());
    return "event fired";
});*/

/*Route::get('test', function () {
    // this checks for the event
    return request()->ip();
//    return view('home');
});*/

Route::get('testy', function () {
    /*$users = Project::groupBy('url_id')->havingRaw('COUNT(*) > 1')->get();
    $users->each(function ($user, $key) {
        sleep(2);
        $user->url_id = (string) Hashids::encode((int)microtime(true));
        $user->save();
        sleep(2);
    });*/

//    $user = User::find('cbb785b0-7578-4897-86dd-8154af47b39b');
//    return response()->json(['test' => $user->projects->count()]);
//    echo url('user', 'lol' ) . '/about';
    //Find project
    /*$project = Project::with('wins.award')->whereHas('wins', function ($query) {
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
    return $project;*/
});


//Route::group(['middleware' => 'web'], function () {
//    Route::get('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::post('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::get('auth/{provider?}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');
//});

Route::get('verification/error', 'Auth\VerifyController@getVerificationError');
Route::get('verification/{token}', 'Auth\VerifyController@doVerificationProcess');
//Route::get('verification/{token}', 'Auth\AuthController@getVerification');

Route::any('{path?}', function() use ($dispatcher) {
    $countries = Country::orderBy('name', 'desc')->get();

    if (App::environment('local')) {
        return view("dev", compact('countries'));
    } else {
        $ua = request()->server('HTTP_USER_AGENT');

        if (preg_match('/facebookexternalhit|Facebot|Twitterbot|Pinterest|Google.*snippet/i', $ua)) {
            $segments = request()->segments();
            try {
                $project = $dispatcher->get('projects/' . end($segments));
            } catch (Dingo\Api\Exception\InternalHttpException $e) {
                $response = $e->getResponse();
            } catch (NotFoundHttpException $e) {
                return redirect('404');
//                $response = $e->getResponse();
            } catch (ModelNotFoundException $e) {
                return redirect('404');
//                $response = $e;
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