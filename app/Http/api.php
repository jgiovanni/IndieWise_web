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
use GetStream\StreamLaravel\Facades\FeedManager;
use Vinkla\Hashids\Facades\Hashids;

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

        $enricher = new Enrich();
        $feed = FeedManager::getNotificationFeed($user_id);
        $activities = $feed->getActivities(0,25)['results'];
        $activities = $enricher->enrichActivities($activities);

        return response()->json(compact('activities'));
    });

    $api->get('messages', 'MessagesController@index');
    $api->post('messages', 'MessagesController@store');
    $api->get('messages/{id}', 'MessagesController@show');
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

    $api->post('contact', 'MailController@contactUs');

});