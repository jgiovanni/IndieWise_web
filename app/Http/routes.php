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


$dispatcher = app('Dingo\Api\Dispatcher');

Route::any('{path?}', function() use ($dispatcher) {
    $countries = $dispatcher->get('countries', ['sort' => 'name']);
    if (App::environment('local')) {
        return view("dev", compact('countries'));
    } else {
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
