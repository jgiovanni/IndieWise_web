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
use App\Award;
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

if (App::environment('local')) {

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

    $awards = Award::all();
    $awards->each(function ($award) {

        //Find project
        $projects = Project::with('wins.award')->whereHas('wins', function ($query) use ($award) {
            $query->where('award_id', $award);
        }, '=', 0)->whereHas('nominations', function ($query) use ($award) {
            $query->where('award_id', $award);
        }, '>=', 5)->get();

        $projects->each(function ($project) use ($award) {
            if (!is_null($project)) {
                //Award win to project
                $project->wins()->create([
                    'award_id' => $award,
                    'owner_id' => $project->owner_id,
                ]);
            }
        });

//        return $project;
    });
});

    Route::any('login-as/{id}', function ($id) use ($dispatcher){
        $token = JWTAuth::fromUser(User::find($id));
        dd($token);
    });
}



//Route::group(['middleware' => 'web'], function () {
//    Route::get('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::post('auth/{provider}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
Route::get('auth/{provider}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');
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
})->where("path", ".+")/*->where("path", "!community")*/;

Route::auth();

/*
Route::get('/', function () {
    return view('welcome');
});

Route::get('/logout', function () {
    //Auth::logout();
    $user = Auth::user();
    return response()->json($user);
});

Route::get('/home', 'HomeController@index');*/