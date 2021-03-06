<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\SocialAccountService;
use App\User;
use Illuminate\Support\Facades\Auth;
use League\OAuth1\Client\Credentials\TemporaryCredentials;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Laravel\Socialite\Contracts\Factory as Socialite;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @param Socialite $socialite
     */
    public function __construct(Socialite $socialite)
    {
//        $this->middleware('guest', ['except' => ['getLogout', 'getVerification', 'getVerificationError']]);
        $this->socialite = $socialite;
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * Redirect the user to the Facebook authentication page.
     *
     * @param string $provider
     * @param Request $request
     * @param SocialAccountService $service
     * @return Response
     */
    public function redirect($provider = 'facebook', Request $request, SocialAccountService $service)
    {
//        dd('here');
        //return $this->socialite->with($provider)->stateless()->redirect();

        if ($provider == 'twitter') {
            $provider = \Laravel\Socialite\Facades\Socialite::driver($provider);
            // Part 1 of 2: Initial request from Satellizer.
            if (!$request->input('oauth_token') || !$request->input('oauth_verifier')) {
                // Redirect to fill the session (without actually redirecting)
                $provider/*->stateless()*/
                ->redirect();

                /** @var TemporaryCredentials $temp */
                $credentials = $request->getSession()->get('oauth.temp');

                return response()->json(['oauth_token' => $credentials->getIdentifier()]);
            } // Part 2 of 2: Second request after Authorize app is clicked.
            else {
                $credentials = new TemporaryCredentials();
                $credentials->setIdentifier($request->input('oauth_token'));
                $request->getSession()->set('oauth.temp', $credentials);

                // Handle the user etc.
            }
        } else {
            if ($request->has('redirectUri')) {
                config()->set("services.{$provider}.redirect", $request->get('redirectUri'));
            }
        }

        // Step 1 + 2
        $user = $service->createOrGetUser($this->socialite->with($provider)->stateless()->user(), $provider);
        if ($user) {
//            Auth::login($user, true);
            $customClaims = [
                'id' => $user->id,
                'email' => $user->email,
                'username' => explode("@", $user->username)[0],
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'picture' => $user->avatar,
            ];
            $token = JWTAuth::claims($customClaims)->fromUser($user);
        } else {
            return response()->make('something went wrong');
        }

        return response()->json(compact('token'));
    }

    /**
     * Obtain the user information from Facebook.
     *
     * @param null $provider
     * @param SocialAccountService $service
     * @return Response
     */
    public function callback($provider = null, SocialAccountService $service)
    {
        $user = $service->createOrGetUser($this->socialite->with($provider)->stateless()->user());
        if ($user) {
            $customClaims = [
                'id' => $user->id,
                'email' => $user->email,
                'username' => explode("@", $user->username)[0],
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'picture' => $user->avatar,
            ];
//            Auth::login($user, true);
            $token = JWTAuth::claims($customClaims)->fromUser($user);
        } else {
            return response()->make('something went wrong');
        }

        return response()->json(compact('token'), 200, ['Token' => $token]);
    }

    public function logout()
    {
//        JWTAuth::invalidate(JWTAuth::getToken());
        Auth::logout();
        return back();
//        return redirect('/');
    }


}
