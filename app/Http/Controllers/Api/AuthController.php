<?php

namespace IndieWise\Http\Controllers\Api;

use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use IndieWise\Http\Controllers\Controller;
use IndieWise\Http\Requests;
use Dingo\Api\Contract\Http\Request;
use IndieWise\PasswordReset;
use IndieWise\Playlist;
use IndieWise\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use IndieWise\Http\Requests\v1\AuthenticationRequest;
use IndieWise\Http\Requests\v1\UserRequest;
use Dingo\Api\Routing\Helpers;

class AuthController extends Controller
{
    use Helpers, ResetsPasswords;
    //

    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getToken']);
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
        try {
            if ( ! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch ( JWTException $e) {
            return response()->json(['error' => $e], 401);
        }


        return response()->json(compact('token'));
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Logged out!'], 200);
    }

    public function register(UserRequest $request) {
        try {
            $user = new User($request->except('password_confirmation'));
            $user->save();

            // Add playlists
            Playlist::create(['name' => 'Favorites', 'user_id' => $user->id]);
            Playlist::create(['name' => 'Watch Later', 'user_id' => $user->id]);

            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'User already exists.'], 409);
        }

        return response()->json(compact('token'));
    }

    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
//            'password' => 'required|min:8|confirmed',
        ]);

        //invalidate old tokens
        PasswordReset::whereEmail($request->email)->delete();
        $email = $request->email;
        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);
        $token = $reset->token;
        Mail::send('auth.emails.password', compact('email', 'token'), function ($mail) use ($email) {
            $mail->to($email)
                ->from('noreply@getindiewise.com')
                ->subject('Password reset link');
        });
//        return response()->json($token);
        return response()->json(true);
    }

    public function verify(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
        ]);
        $check = PasswordReset::whereEmail($request->email)
            ->whereToken($request->token)
            ->first();
        if (!$check) {
            return response()->error('Email does not exist', 422);
        }
        return response()->json(true);
    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'token'    => "required|exists:password_resets,token,email,{$request->email}",
            'password' => 'required|min:8|confirmed',
        ]);
        $user = User::whereEmail($request->email)->firstOrFail();
        $user->password = bcrypt($request->password);
        $user->save();
        //delete pending resets
        PasswordReset::whereEmail($request->email)->delete();
        return response()->json(true);
    }

    public function checkEmailUse(Request $request)
    {
        $exists = User::where('email', $request->get('email'))->first();
        return response()->json(['verify' => !!$exists]);
    }
}
