<?php

namespace IndieWise\Http\Controllers\Api;

use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Requests;
use Dingo\Api\Contract\Http\Request;
use IndieWise\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        try {
            if ( ! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch ( JWTException $e) {
            return response()->json(['error' => $e], 401);
        }


        return response()->json(compact('token'));//Response::json(compact('token'));
    }

    public function register(Request $request) {

        try {
            $user = new User($request->all());
            $user->save();

            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'User already exists.'], 409);
        }

        //$token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }
}
