<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Dingo\Api\Contract\Http\Request;
use App\Http\Transformers\v1\UserTransformer;
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
                return response()->json(['errors' => [ 'credentials' => ['Invalid Credentials']]], 401);
            }
            Auth::attempt($credentials, true);
        } catch ( JWTException $e) {
            return response()->json(['error' => $e], 401);
        }


        return response()->json(compact('token'));
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        Auth::logout();

        return response()->json(['message' => 'Logged out!'], 200);
    }

    public function register(UserRequest $request) {
        try {
            $user = new User($request->except('password_confirmation'));
//            $user->verified = 1;
//            $user->verified_at = Carbon::now()->toDateTimeString();
            $user->ip_used = request()->ip();

            $user->save();

            // Add playlists
            Playlist::create(['name' => 'Favorites', 'user_id' => $user->id]);
            Playlist::create(['name' => 'Watch Later', 'user_id' => $user->id]);

            // Set default settings
            setting()->set('email_critique', true, "'$user->id'");
            setting()->set('email_nomination', true, "'$user->id'");
            setting()->set('email_win', true, "'$user->id'");
            setting()->set('email_comment', true, "'$user->id'");
            setting()->set('email_message', true, "'$user->id'");
            setting()->set('email_like', true, "'$user->id'");
            setting()->save("'$user->id'");


            Auth::login($user, true);
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

    public function requestVerification(Request $request)
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

        if ( !$user->verified ) {
            UserVerification::generate($user);
            UserVerification::sendQueue($user, $subject = 'IndieWise: Account Verification', $from = 'noreply@getindiewise.com', $name = 'IndieWise Registration');
            return response()->json(['sent' => true]);
        } else return response()->json(['sent' => false]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request|\Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function updateMe(UserRequest $request, $id)
    {
        try {
            if (!$user = JWTAuth::parseToken()->toUser()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['token_expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['token_invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['token_absent'], 401);
        }

        // if user changes email address, revalidation is required
        if ($user->email === $request->get('email')) {
            $user->verified = false;
            $user->verified_at = NULL;
            UserVerification::generate($user);
            UserVerification::sendQueue($user, $subject = 'IndieWise: Account Verification', $from = 'noreply@mail.getindiewise.com', $name = 'IndieWise Registration');
        }

        $user->update($request->except('genres', 'country', 'types', 'user_id', 'name', 'user_hash', 'app_id', 'password_confirmation'));

        if( $request->has('genres') && count($request->get('genres')) > 0 && !is_array($request->get('genres')[0]) ) {
            $user->syncGenres($request->get('genres'));
        }
        if( $request->has('types') && count($request->get('types')) > 0 && !is_array($request->get('types')[0]) ) {
            $user->syncTypes($request->get('types'));
        }
        if( $request->has('settings')) {
            $user->syncSettings($request->get('settings'));
        }
        return $this->response->item($user->load('genres', 'country', 'types'), new UserTransformer);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function terminate()
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
    }

}