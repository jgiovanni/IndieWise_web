<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Sendinblue\Mailin;
use App\User;
use Jrean\UserVerification\Traits\VerifiesUsers;
use Jrean\UserVerification\Facades\UserVerification;

class VerifyController extends Controller
{
    use VerifiesUsers;

    /**
     * VerifyController constructor.
     */
    public function __construct()
    {
        if (config('verification.verify')) {
            //$this->middleware($this->guestMiddleware());
        }
    }

    public function doVerificationProcess(Request $request, $token) {

        $mailin = new Mailin(config('services.sendinblue.url'), config('services.sendinblue.key'));

        $user = User::with('country')->where('email', $request->input('email'))->first();
        $data = [
            "email" => $user->email,
            "attributes" => ["NAME" => $user->firstName, "SURNAME" => $user->lastName, "COUNTRY" => isset($user->country_id) ? $user->country->name : '', "SIGNUP_DATE" => $user->created_at],
            "listid" => [2]
        ];
        $mailin->create_update_user($data);

        return $this->getVerification($request, $token);


    }

}
