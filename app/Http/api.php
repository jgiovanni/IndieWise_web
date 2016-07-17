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
$api = app('Dingo\Api\Routing\Router');

$api->version('v1', [
    //'middleware' => 'api.throttle', 'limit' => 75, 'expires' => 1,
    'namespace' => 'IndieWise\Http\Controllers\Api'
], function ($api) {

    $api->get('/', function () {
        return [
            'message' => 'Welcome to the IndieWise API'
        ];
    });

    // Authentication
    $api->post('login', 'AuthController@login');
    $api->post('register', 'AuthController@register');
    $api->post('requestPasswordReset', 'AuthController@requestPasswordReset');
    $api->post('resetPassword', 'AuthController@resetPassword');

    // Static Data Routes
    $api->resource('countries', 'CountriesController');
    $api->resource('languages', 'LanguagesController');
    $api->resource('awards', 'AwardsController');
    $api->resource('genres', 'GenresController');
    $api->resource('types', 'TypesController');

    // Auth Routes
    $api->get('users/me', 'UsersController@me');
    $api->post('users/me', 'UsersController@updateMe');

    // Resource Routes
    $api->resource('users', 'UsersController');
    $api->resource('projects', 'ProjectsController');
    $api->resource('reactions', 'ReactionsController');
    $api->resource('critiques', 'CritiquesController');


});