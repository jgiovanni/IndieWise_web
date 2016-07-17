<?php

namespace IndieWise\Http\Controllers\Api;

use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Requests;
use Dingo\Api\Contract\Http\Request;
use IndieWise\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use ResetsPasswords;
    //

    public function __construct()
    {
        $this->middleware('guest');
    }

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

        return response()->json(compact('token'));
    }

    public function requestPasswordReset(Request $request)
    {
        $this->validateSendResetLinkEmail($request->only('email'));

        $broker = $this->getBroker();

        $response = Password::broker($broker)->sendResetLink(
            $this->getSendResetLinkEmailCredentials($request->only('email')),
            $this->resetEmailBuilder()
        );

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return $this->getSendResetLinkEmailSuccessResponse($response);
            case Password::INVALID_USER:
            default:
                return $this->getSendResetLinkEmailFailureResponse($response);
        }
//        return response()->json($this->postEmail($request->only('email')));
    }

    public function resetPassword(Request $request)
    {
        return response()->json($this->postEmail($request->all()));
    }
}
