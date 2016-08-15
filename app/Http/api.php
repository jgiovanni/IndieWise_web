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
use Vinkla\Hashids\Facades\Hashids;

function collectReferences($activities)
{
    $model_references = array();
    foreach ($activities as $key => $activity) {
        foreach ($activity as $field=>$value) {
            if ($value === null) {
                continue;
            }
            if (in_array($field, ['actor', 'object'])) {
                $reference = explode(':', $value);
                $model_references[$reference[0]][$reference[1]] = 1;
            }
        }
    }
    return $model_references;
}

$api = app('Dingo\Api\Routing\Router');

// must protext actions instead of routes unless admin routes
// 'middleware' => ['api.auth', 'jwt.refresh','api.throttle']

$api->version('v1', [
    'middleware' => 'api.throttle', 'limit' => 100, 'expires' => 1,
    'namespace' => 'IndieWise\Http\Controllers\Api'
], function ($api) {

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
        $user_id = app('Dingo\Api\Auth\Auth')->user()->id;
//        $user_id = '00000000-0000-6463-7952-633635765552';
        $enricher = new Enrich();
        $feed = FeedManager::getNotificationFeed($user_id);
        $activities = $feed->getActivities(0,25)['results'];
        $unseen = 0;
        $unread = 0;

        // get references
        $references = [];
        foreach ($activities as $aggregated) {
            $references = array_replace_recursive($references, collectReferences($aggregated['activities']));
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
            $activities[$key]['updated_at'] = new \Carbon\Carbon($activities[$key]['updated_at']);
            foreach ($activities[$key]['activities'] as $keyA => $activity) {
                $notEnrichedData = [];
                foreach (['actor', 'object'] as $field) {
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
//                    dd($activities[$key]['activities']);
                }
            }

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

    // User Routes
    $api->post('users/me', 'UsersController@updateMe');

    // Query Routes
    $api->get('users/count', 'UsersController@count');
    $api->get('users/countUserStats/{id?}', 'UsersController@countUserStats');
    $api->get('projects/watched', 'ProjectsController@recentlyWatched');
    $api->get('reactions/latest', 'ReactionsController@latest');
    $api->get('nominations/latest', 'NominationsController@latest');
    $api->get('critiques/latest', 'CritiquesController@latest');
    $api->get('playlistItems/check/{id?}', 'PlaylistItemsController@checkIn');

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

    // Email Routes
    $api->post('contact', 'MailController@contactUs');
    $api->post('report', 'MailController@report');

});