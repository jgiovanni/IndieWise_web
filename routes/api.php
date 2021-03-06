<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Dingo\Api\Contract\Http\Request;
use GetStream\Stream\Client;
use GetStream\StreamLaravel\Enrich;
use GetStream\StreamLaravel\EnrichedActivity;
use GetStream\StreamLaravel\Facades\FeedManager;
use JD\Cloudder\Facades\Cloudder;
use Vinkla\Hashids\Facades\Hashids;

$api = app('Dingo\Api\Routing\Router');

// must protext actions instead of routes unless admin routes
// 'middleware' => ['api.auth', 'jwt.refresh','api.throttle']

$api->version('v1', [
    'middleware' => 'api.throttle', 'limit' => 100, 'expires' => 1, 'namespace' => 'App\Http\Controllers'
], function ($api) {

    // Standard Routes
    $api->group(['namespace' => '\Api'], function ($api) {
        $api->get('/', function () {
            return [
                'message' => 'Welcome to the IndieWise API'
            ];
        });

        $api->get('notifications/token', function (\Dingo\Api\Http\Request $request) {
            $user_id = app('Dingo\Api\Auth\Auth')->user()->id;

            // Instantiate a new client, find your API keys here https://getstream.io/dashboard/
            $client = new Client('97wfnrargt9f', '4t8dpp9bsap2svjhvu2n4x3h3bvwyyb3kgvg7san3bab2esu6vmnquffq2u95z82');
            // Set API endpoint location
            $client->setLocation('us-east');
            // Instantiate a feed object
            $user_feed = $client->feed($request->type, $user_id);
            //echo $_GET;
            $token = $user_feed->getToken();

            return response()->json(compact('token'));
        });

        $api->get('notifications/feed', function (\Dingo\Api\Http\Request $request) {

            function collectReferences($activities, $loadObjectsArray)
            {
                $model_references = array();
                foreach ($activities as $key => $activity) {
                    foreach ($activity as $field=>$value) {
                        if ($value === null) {
                            continue;
                        }
                        // Backward compatability (IndieWise <--> App Namespaces)
                        $value = str_replace('IndieWise', 'App', $value);
//                        dd($value);
                        if (in_array($field, $loadObjectsArray)) {
                            $reference = explode(':', $value);
                            $model_references[$reference[0]][$reference[1]] = 1;
                        }
                    }
                }
                return $model_references;
            }

            $user_id = app('Dingo\Api\Auth\Auth')->user()->id;
            $loadObjectsArray = ['actor', 'object'];

//        $user_id = '00000000-0000-6463-7952-633635765552';
            $enricher = new Enrich();
            $feed = FeedManager::getNotificationFeed($user_id);
            $activities = $feed->getActivities(0,10)['results'];
            $unseen = 0;
            $unread = 0;

            // get references
            $references = [];
            foreach ($activities as $aggregated) {
                $references = array_replace_recursive($references, collectReferences($aggregated['activities'], $loadObjectsArray));
            }

            // get objects
            $objects = array();
            foreach ($references as $content_type => $content_ids) {
                $content_type_model = new $content_type;
                $with = array();
                if (property_exists($content_type_model, 'activityLazyLoading')) {
                    $with = $content_type_model->activityLazyLoading;
                }
                $fetched = $enricher->fromDb($content_type_model, array_keys($content_ids), $with);
                $objects[$content_type] = $fetched;
            }

            // inject objects
            foreach ($activities as $key => $aggregated) {
                $activities[$key]['actors'] = [];
                $activities[$key]['objects'] = [];

                $tempActors = [];

//            $activities[$key]['updated_at'] = new \Carbon\Carbon($activities[$key]['updated_at']);
                foreach ($activities[$key]['activities'] as $keyA => $activity) {
                    $notEnrichedData = [];
                    foreach ($loadObjectsArray as $field) {
                        if (!isset($activity[$field]))
                            continue;
                        $value = $activity[$field];
                        $reference = explode(':', $value);
                        if (!array_key_exists($reference[0], $objects)) {
                            $notEnrichedData[$reference[0]] = $reference[1];
                            continue;
                        }
                        if (!array_key_exists($reference[1], $objects[$reference[0]])) {
                            $notEnrichedData[$reference[0]] = $reference[1];
                            continue;
                        }
                        $activities[$key]['activities'][$keyA][$field] = $objects[$reference[0]][$reference[1]];
                        if ($field === 'actor'){
                            $tempActors[] = collect([
                                'fullName' => $objects[$reference[0]][$reference[1]]['fullName'],
                                'url_id' => $objects[$reference[0]][$reference[1]]['url_id'],
                                'id' => $objects[$reference[0]][$reference[1]]['id'],
                            ]);
                        }
//                    dd($activities[$key]['activities']);
                    }

                    // collect project data
                    if (isset($activity['project_name']) && isset($activity['project_url_id']))
                        $activities[$key]['project'] = collect([
                            'name' => $activity['project_name'],
                            'url_id' => $activity['project_url_id']
                        ]);

                }
                $activities[$key]['actors'] = collect(array_unique($tempActors));

                if(!$aggregated['is_read']) {
                    $unread++;
                }
                if(!$aggregated['is_seen']) {
                    $unseen++;
                }
            }

            return response()->json(compact('activities', 'unread', 'unseen'));
        });

        $api->get('messages', 'MessagesController@index');
        $api->get('messages/new', 'MessagesController@newMessages');
        $api->post('messages', 'MessagesController@store');
        $api->get('messages/{id}', 'MessagesController@show');
        $api->get('messages/{id}/messages', 'MessagesController@showMessages');
        $api->put('messages/{id}', 'MessagesController@update');

        /*$api->group(['middleware' => ['api.auth', 'jwt.refresh']], function ($api) {
            // Endpoints registered here will have the "foo" middleware applied.
        });

        $api->group(['middleware' => ['jwt.refresh']], function ($api) {
            $api->get('token', 'AuthController@getToken');
        });*/

        // Authentication
        $api->post('login', 'AuthController@login');
        $api->post('logout', 'AuthController@logout');
        $api->post('register', 'AuthController@register');
        $api->post('requestPasswordReset', 'AuthController@sendResetLinkEmail');
        $api->post('resetPassword', 'AuthController@reset');
        $api->get('authenticate', 'AuthController@authenticatedUser');
        $api->get('token', 'AuthController@getToken');
        $api->get('emailCheck', 'AuthController@checkEmailUse');
        $api->get('request_verification', 'AuthController@requestVerification');
        $api->get('check_verification', 'AuthController@checkVerification');
        $api->post('auth/{provider}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
        $api->get('auth/{provider}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');

        // User Routes
        $api->put('users/me/{id?}', 'AuthController@updateMe');
        $api->delete('users/me/{id?}', 'AuthController@terminate');

        // Query Routes
        $api->get('users/count', 'UsersController@count');
        $api->get('users/countUserStats/{id?}', 'UsersController@countUserStats');
        $api->get('projects/watched', 'ProjectsController@recentlyWatched');
        $api->post('projects/watched', 'ProjectsController@recordWatched');
        $api->get('projects/limit', 'ProjectsController@canUpload');
        $api->get('projects/count', 'ProjectsController@count');
        $api->get('projects/reactions', 'ProjectsController@reactionStats');
        $api->get('reactions/latest', 'ReactionsController@latest');
        $api->get('nominations/latest', 'NominationsController@latest');
        $api->get('critiques/latest', 'CritiquesController@latest');
        $api->get('playlistItems/check/{id?}', 'PlaylistItemsController@checkIn');
        /*$api->get('policies/upload', function () {
            $json_policy = json_encode([
//            "handle" => "KW9EJhYtS6y48Whm2S6D",
                "expiry" => intval(time() + (60 * 60)),
                "call" => ["write", "convert", "pick" , "store"],
//                "maxSize" => 1073741824 // 1GB
                "maxSize" => 2147483648 // 2GB
            ]);
            $policy = strtr(base64_encode($json_policy), '+/=', '-_');
            $signature = hash_hmac("sha256", $policy, "6FU2RG57IFGDPE6EIEUIEXJWIM");

            return response()->json(compact('policy', 'signature'));

        });*/
        $api->delete('uploads/images/:public_id', function ($publicId) {
            $options = [

            ];
            Cloudder::destroyImage($publicId, $options);
            Cloudder::delete($publicId, $options);
        });
        // Static Data Routes
        $api->resource('countries', 'CountriesController');
        $api->resource('languages', 'LanguagesController');
        $api->resource('awards', 'AwardsController');
        $api->resource('genres', 'GenresController');
        $api->resource('types', 'TypesController');

        // Resource Routes
        $api->resource('users', 'UsersController');
        $api->resource('playlists', 'PlaylistsController');
        $api->resource('playlistItems', 'PlaylistItemsController');
        $api->resource('projects', 'ProjectsController');
        $api->resource('reactions', 'ReactionsController');
        $api->resource('ratings', 'RatingsController');
        $api->resource('critiques', 'CritiquesController');
        $api->resource('comments', 'CommentsController');
        $api->resource('nominations', 'NominationsController');
        $api->resource('winners', 'WinnersController');
        $api->resource('wins', 'WinsController');

        // Email Routes
        $api->post('contact', 'MailController@contactUs');
        $api->post('report', 'MailController@report');
    });

    // Admin Routes
    $api->group(['namespace' => '\Admin', 'prefix' => 'admin'], function ($api) {
        // Auth Routes
        $api->post('login', 'AuthController@login');
        $api->post('logout', 'AuthController@logout');
        $api->get('authenticate', 'AuthController@authenticatedUser');
        // Static Data Routes
        $api->resource('countries', 'CountriesController');
        $api->resource('languages', 'LanguagesController');
        $api->resource('awards', 'AwardsController');
        $api->resource('genres', 'GenresController');
        $api->resource('types', 'TypesController');

        // Resource Routes
        $api->resource('users', 'UsersController');
        $api->resource('playlists', 'PlaylistsController');
        $api->resource('playlistItems', 'PlaylistItemsController');
        $api->resource('projects', 'ProjectsController');
        $api->resource('reactions', 'ReactionsController');
        $api->resource('ratings', 'RatingsController');
        $api->resource('critiques', 'CritiquesController');
        $api->resource('comments', 'CommentsController');
        $api->resource('nominations', 'NominationsController');
        $api->resource('wins', 'WinsController');
//        $api->resource('actions', 'ActionsController');

    });
});

