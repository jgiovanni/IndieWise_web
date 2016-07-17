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

Route::any('{path?}', function() {
    if (App::environment('local')) {
        return view("dev");
    } else {
        return view("index");
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
