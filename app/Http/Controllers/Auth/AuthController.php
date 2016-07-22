<?php

namespace IndieWise\Http\Controllers\Auth;

use Illuminate\Http\Request;
use IndieWise\User;
use Validator;
use IndieWise\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
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

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @param Socialite $socialite
     */
    public function __construct(Socialite $socialite)
    {
        $this->middleware('guest', ['except' => 'getLogout']);
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
     * @return Response
     */
    public function redirect($provider = null)
    {
        return $this->socialite->with($provider)->redirect();
    }

    /**
     * Obtain the user information from Facebook.
     *
     * @return Response
     */
    public function callback($provider = null, Request $request)
    {
        if($user = $this->socialite->with($provider)->stateless()->user()){
            dd($user);
        }else{
            return response()->make('something went wrong');
        }
        //$user = Socialite::driver($provider)->user();

        // $user->token;
    }

}
