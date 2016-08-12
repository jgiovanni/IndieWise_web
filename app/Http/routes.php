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


use GetStream\Stream\Client;
use IndieWise\Country;

$dispatcher = app('Dingo\Api\Dispatcher');

Route::get('', function (){
    return view('welcome');
});

//Route::group(['middleware' => 'web'], function () {
//    Route::get('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
    Route::post('auth/{provider?}', 'Auth\AuthController@redirect')->where('provider', 'google|twitter|facebook');
    Route::get('auth/{provider?}/callback', 'Auth\AuthController@callback')->where('provider', 'google|twitter|facebook');
//});

// verification token resend form
Route::get('verify/resend', [
    'uses' => 'Auth\VerifyController@showResendForm',
    'as' => 'verification.resend',
]);

// verification token resend action
Route::post('verify/resend', [
    'uses' => 'Auth\VerifyController@sendVerificationLinkEmail',
    'as' => 'verification.resend.post',
]);

// verification message / user verification
Route::get('verify/{token?}', [
    'uses' => 'Auth\VerifyController@verify',
    'as' => 'verification.verify',
]);

Route::any('alpha/{path?}', function() use ($dispatcher) {

    $countries = Country::orderBy('name', 'desc')->get();
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


