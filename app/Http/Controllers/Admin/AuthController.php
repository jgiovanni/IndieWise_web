<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Dingo\Api\Contract\Http\Request;
use App\PasswordReset;
use App\Playlist;
use App\User;
use Jrean\UserVerification\Facades\UserVerification;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\v1\AuthenticationRequest;
use App\Http\Requests\v1\UserRequest;
use Dingo\Api\Routing\Helpers;
use Jrean\UserVerification\Traits\VerifiesUsers;


class AuthController extends Controller
{
    use Helpers, ResetsPasswords, VerifiesUsers;


    //

    public function __construct()
    {
        $this->middleware('guest', ['except' => ['getToken', 'getVerification', 'getVerificationError']]);
    }

    /**
     * Refresh the token
     *
     * @return mixed
     */
    public function getToken()
    {
        $token = JWTAuth::getToken();
        if (!$token) {
            return $this->response->errorMethodNotAllowed('Token not provided');
        }
        try {
            $refreshedToken = JWTAuth::refresh($token);
        } catch (JWTException $e) {
            return $this->response->errorInternal('Not able to refresh Token');
        }
        return $this->response->withArray(['token' => $refreshedToken]);
    }

    /**
     * Returns the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

            Auth::login($user, true);
            $test = DB::table('role_user')->where('user_id', $user->id)->where('role_id', 1000)->first();
            if (empty($test)) {
                return response()->json(['user_not_authorized'], 401);
            }
            /*if (!$user->hasRole('admin')) {
                return response()->json(['user_not_authorized'], 401);
            }*/
        } catch (JWTException $e) {
            return response()->json(['token_expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['token_invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['token_absent'], 401);
        }
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    public function login(AuthenticationRequest $request){
        $credentials = $request->only('email', 'password');
        // login user first with Auth first to build custom token
        if (Auth::attempt($credentials, true)) {
            $me = Auth::user();
            $customClaims = [
                'id' => $me->id,
                'email' => $me->email,
                'firstName' => $me->firstName,
                'lastName' => $me->lastName,
                'picture' => $me->avatar,
            ];
            try {
                if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                    return response()->json(['errors' => ['credentials' => ['Invalid Credentials']]], 401);
                }

                $user = JWTAuth::user();
                //Auth::login($user, true);
                $test = DB::table('role_user')->where('user_id', $user->id)->where('role_id', 1000)->first();
                if (empty($test)) {
                    return response()->json(['user_not_authorized'], 401);
                }

            } catch (JWTException $e) {
                return response()->json(['error' => $e], 401);
            }


            return response()->json(compact('token'));
        }
        return response()->json(['errors' => ['credentials' => ['Invalid Credentials']]], 401);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        Auth::logout();
        return response()->json(['message' => 'Logged out!'], 200);
    }

}