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
use App\Critique;
use App\Reaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use App\User;
use GetStream\Stream\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Country;
use App\Project;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Vinkla\Hashids\Facades\Hashids;
use Artesaos\SEOTools\Facades\SEOTools as SEO;
use \Illuminate\Support\Facades\Artisan;

$dispatcher = app('Dingo\Api\Dispatcher');

Route::group(['prefix' => 'console'], function () use ($dispatcher) {
//    dd(Auth::user());
    Route::any('{path?}', function () {
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

/*Route::get('forum', function () {
    // this checks for the event
    if (Auth::user()) {
        $me = Auth::user();
        $customClaims = [
            'id' => $me->id,
            'email' => $me->email,
            'firstName' => $me->firstName,
            'lastName' => $me->lastName,
            'picture' => $me->avatar,
        ];
        try {
            if (!$token = JWTAuth::claims($customClaims)->fromUser($me)) {
                return response()->json(['errors' => ['credentials' => ['Invalid Credentials']]], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => $e], 401);
        }
        return request()->cookie('iw_token', $token, '/', null, true, false);
    } else {
        return redirect('/forum');
    }
});*/

/*Route::get('test', function () {
    $id = '7ec2df4f-fa41-4c6c-b437-697ad79a0f0b';
    if ( isset($id) ) {
        $reactions = Reaction::where('project_id', $id)->get();
        $mapped = $reactions->groupBy('emotion')->map(function ($item) use ($arr) {
            return count($item);
        })->sort()->reverse();
        return response()->json(['mapped' => $mapped]);
        dd($mapped);
    } else {
        return response()->json(['message' => 'project_id required']);
    }
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
        $given = 0;
        $awards = Award::all();
        $awards->each(function ($award) use ($given) {
            //Find project
            $projects = Project::with('wins.award')->whereHas('wins', function ($query) use ($award) {
                $query->where('award_id', $award->id);
            }, '=', 0)->whereHas('nominations', function ($query) use ($award) {
                $query->where('award_id', $award->id);
            }, '>=', 5)->get();

            if (!empty($projects)) {
                $projects->each(function ($project) use ($award, $given) {
                    //Award win to project
                    $project->wins()->create([
                        'award_id' => $award->id,
                        'owner_id' => $project->owner_id,
                    ]);
                    $given++;
                });
            }

//        return $project;
        });
        return $given;
    });

    Route::any('login-as/{id}', function ($id) use ($dispatcher) {
        $token = JWTAuth::fromUser(User::find($id));
        dd($token);
    });
}

Route::get('clear-cache', function() {
    Artisan::call('cache:clear');
    return 'Cache is cleared';
});

Route::get('sign-in', function () {
    return view('auth.login');
});
Route::get('login', function () {
    return view('auth.login');
});
$this->post('sign-in', 'Auth\AuthController@authenticate');
$this->post('login', 'Api\AuthController@login');
$this->get('register', 'Auth\AuthController@register');
$this->get('logout', 'Auth\AuthController@logout');


//$this->group(['middleware' => 'web'], function () {
//    $this->get('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
$this->get('auth/{provider}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
$this->post('auth/{provider}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
$this->get('auth/{provider}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');
//});

$this->get('verification/error', 'Auth\VerifyController@getVerificationError');
$this->get('verification/{token}', 'Auth\VerifyController@doVerificationProcess');
//$this->get('verification/{token}', 'Auth\AuthController@getVerification');

$this->get('', function () use ($dispatcher) {
    $featured = $dispatcher->get('api/projects', [ 'random' => true, 'per_page' => 3]);
    $trending = $dispatcher->get('api/projects', [ 'sort' => 'reactions_count', 'per_page' => 8]);
    $highestRated = $dispatcher->get('api/projects', [ 'sort' => 'topRating', 'per_page' => 8]);
//    dd($highestRated);
    $awardWinning = $dispatcher->get('api/projects', [ 'sort' => 'wins_count', 'per_page' => 8]);
    SEO::setTitle('Home');


    return view('home', compact('featured', 'trending', 'highestRated', 'awardWinning'));
});

$this->get('browse', function () {
    SEO::setTitle('Browse');
    return view('browse');
});

$this->get('latest', function () {
    SEO::setTitle('Latest');
    return view('latest');
});

$this->get('winners', function () {
    SEO::setTitle('Winners');
    return view('winners');
});

$this->get('upload', function () {
    SEO::setTitle('Upload');
    return view('upload');
});

$this->get('about', function () use ($dispatcher) {
    SEO::setTitle('About');
    return view('misc.about');
});

$this->get('faq', function () use ($dispatcher) {
    SEO::setTitle('FAQ');
    return view('misc.faq');
});

$this->get('privacy', function () use ($dispatcher) {
    SEO::setTitle('Privacy Policy');
    return view('misc.privacy-policy');
});

$this->get('tos', function () use ($dispatcher) {
    SEO::setTitle('Terms of Service');
    return view('misc.terms');
});

$this->get('contact', function () use ($dispatcher) {
    SEO::setTitle('Contact Us');
    return view('misc.contact');
});

$this->get('advertise', function () use ($dispatcher) {
    SEO::setTitle('Advertise');
    return view('misc.about');
});

$this->group(['prefix' => 'user'], function ($id) use ($dispatcher) {
    $this->get('{id}', function ($id) use ($dispatcher) {
        $user = $dispatcher->get('api/users/' . $id, [ 'include' => 'genres' ]);
        $stats = $dispatcher->get('api/users/countUserStats/' . $id, [ 'include' => '' ]);
        SEO::setTitle($user->fullName);

        return view('user.views.about', compact('user', 'stats'));
    });

    $this->get('{id}/{view}', function ($id, $view) use ($dispatcher) {
        $user = $dispatcher->get('api/users/' . $id, [ 'include' => 'genres' ]);
        $stats = $dispatcher->get('api/users/countUserStats/' . $id, [ 'include' => '' ]);
        SEO::setTitle($user->fullName . ' ' . ucfirst($view));

        return view('user.views.' . $view, compact('view', 'user', 'stats'));
    })->where('view', 'projects||awards||critiques||settings||analytics');

    // Redirect old urls
    $this->get('{id}/about', function ($id) {
        return redirect('user/' . $id);
    });

    $this->get('{id}/videos', function ($id) {
        return redirect('user/' . $id . '/projects');
    });

});

$this->get('{project_id}', function ($project_id) use ($dispatcher) {
    $project = Project::where('url_id', $project_id)->withCount('upRatings', 'downRatings', 'wins', 'critiques', 'nominations', 'reactions')->firstOrFail();
    //$project = $dispatcher->get('api/projects/' . $project_id, [ 'include' => '' ]);
    // dd($project);

    SEO::setTitle($project->name);
    SEO::setDescription($project->description);
    SEO::opengraph()->setDescription($project->description);
    SEO::opengraph()->setType($project->hosting_type === 'script' ? 'indiewise:screenplay' : 'video.other');
    SEO::opengraph()->setVideoOther([
//        'actor' => (strpos($project->director, ',') || strpos($project->director, ',') || strstr($project->director, PHP_EOL)) !== false ? $project->director : preg_split('/(,|,\s|\/|\s\/\s|\r\n|\n|\r)/', $project->director),
//        'actor:role' => 'string',
//        'director' => (strpos($project->director, ',') || strpos($project->director, '/')) !== false ? $project->director : preg_split("/(,|,\s|\/|\s\/\s)/", $project->director),
//        'writer' => (strpos($project->writer, ',') || strpos($project->writer, '/')) !== false ? $project->writer : preg_split('/(,|,\s|\/|\s\/\s)/', $project->writer),
        'duration' => $project->runTime,
        'release_date' => $project->completionDate,
        'tag' => strpos($project->tags, ',') !== false ? $project->tags : preg_split('/(,|,\s)/', $project->tags)
    ]);
    SEO::opengraph()->addImage($project->thumbnail_url . '?cache=true', ['secure_url' => $project->thumbnail_url . '?cache=true', 'height' => 500, 'width' => 1170]);
    SEO::twitter()->setDescription($project->description);
    SEO::twitter()->setUrl('/' . $project->url_id);
    return view('project.index', compact('project'));
})->where('project_id', '[0-9a-zA-Z]{10,13}+');

$this->get('{project_id}/edit', function ($project_id) use ($dispatcher) {
    $project = Project::where('url_id', $project_id)->withCount('upRatings', 'downRatings', 'wins', 'critiques', 'nominations', 'reactions')->firstOrFail();
    //$project = $dispatcher->get('api/projects/' . $project_id, [ 'include' => '' ]);
    // dd($project);

    SEO::setTitle('Edit: ' . $project->name);
    return view('project.edit', compact('project_id'));
})->where('project_id', '[0-9a-zA-Z]{10,13}+');

$this->get('{project_id}/critique/{critique_id}', function ($project_id, $critique_id) use ($dispatcher) {
    $critique = Critique::where('url_id', $critique_id)->with('project.owner')->withCount(['comments'])->firstOrFail();
//    $critique = $dispatcher->get('api/critiques/' . $critique_id, [ 'include' => 'project.owner' ]);

    SEO::setTitle('Critique by ' . $critique->user->name . ' for ' . $critique->project->name);
    return view('project.critique', compact('critique'));
})->where('project_id', '[0-9a-zA-Z]{10,13}+');

$this->get('sitemap', function(){

    // create new sitemap object
    $sitemap = App::make("sitemap");

    // set cache key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean)
    // by default cache is disabled
    $sitemap->setCache('laravel.sitemap', 60);

    // check if there is cached sitemap and build new only if is not
    if (!$sitemap->isCached())
    {
        // add item to the sitemap (url, date, priority, freq)
        $sitemap->add(URL::to('/'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/browse'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/latest'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/forum'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');

        $sitemap->add(URL::to('/about'), '2016-09-21T08:00:00-05:00', '0.8', 'monthly');
        $sitemap->add(URL::to('/faq'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/contact'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/privacy-policy'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/terms-of-service'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
//        $sitemap->add(URL::to('/'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');

        // get all posts from db
        $projects = Project::with('critiques')->orderBy('created_at', 'desc')->get();

        // add every post to the sitemap
        foreach ($projects as $project)
        {
            $images = [
                    ['url' => $project->thumbnail_url . '?cache=true', 'title' => $project->name, 'caption' => $project->description, 'geo_location' => $project->filmingCountry->name],
            ];
            $sitemap->add(URL::to($project->url_id), $project->edited_at, '0.8', 'daily', $images);

            // add every critique per project
            foreach ($project->critiques as $critique)
            {
                $sitemap->add(URL::to($project->url_id . '/critique/' . $critique->url_id), $critique->edited_at, '0.7', 'weekly');
            }

        }

        // TODO list profiles routes
    }

    // show your sitemap (options: 'xml' (default), 'html', 'txt', 'ror-rss', 'ror-rdf')
    return $sitemap->render('xml');
//    return $sitemap->store('xml', 'sitemap');

});
$this->get('sitemap-generate', function(){

    // create new sitemap object
    $sitemap = App::make("sitemap");

    // set cache key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean)
    // by default cache is disabled
    $sitemap->setCache('laravel.sitemap', 60);

    // check if there is cached sitemap and build new only if is not
    if (!$sitemap->isCached())
    {
        // add item to the sitemap (url, date, priority, freq)
        $sitemap->add(URL::to('/'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/browse'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/latest'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');
        $sitemap->add(URL::to('/forum'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');

        $sitemap->add(URL::to('/about'), '2016-09-21T08:00:00-05:00', '0.8', 'monthly');
        $sitemap->add(URL::to('/faq'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/contact'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/privacy-policy'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
        $sitemap->add(URL::to('/terms-of-service'), '2016-09-21T08:00:00-05:00', '0.9', 'monthly');
//        $sitemap->add(URL::to('/'), '2016-09-21T08:00:00-05:00', '1.0', 'daily');

        // get all posts from db
        $projects = Project::with('critiques')->orderBy('created_at', 'desc')->get();

        // add every post to the sitemap
        foreach ($projects as $project)
        {
            $images = [];
            if (isset($project->thumbnail_url) && $project->thumbnail_url !== '') {
                $images = [
                    ['url' => $project->thumbnail_url . '?cache=true', 'title' => $project->name, 'caption' => $project->description, 'geo_location' => $project->filmingCountry->name],
                ];
            }
            $sitemap->add(URL::to($project->url_id), $project->edited_at, '0.8', 'daily', $images);

            // add every critique per project
            foreach ($project->critiques as $critique)
            {
                $sitemap->add(URL::to($project->url_id . '/critique/' . $critique->url_id), $critique->updated_at, '0.7', 'weekly');
            }

        }

        // TODO list profiles routes
    }

    // show your sitemap (options: 'xml' (default), 'html', 'txt', 'ror-rss', 'ror-rdf')
//    return $sitemap->render('xml');
    return $sitemap->store('xml', 'sitemap');

});

/*

Route::get('/logout', function () {
    //Auth::logout();
    $user = Auth::user();
    return response()->json($user);
});

Route::get('/home', 'HomeController@index');*/