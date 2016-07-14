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


    $api->get('users/me', 'UsersController@me');
    $api->post('users/me', 'UsersController@updateMe');
    $api->resource('users', 'UsersController');
    $api->resource('projects', 'ProjectsController');


});