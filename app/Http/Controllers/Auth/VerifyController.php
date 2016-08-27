<?php

namespace IndieWise\Http\Controllers\Auth;

use IndieWise\Http\Controllers\Controller;
use Krucas\LaravelUserEmailVerification\VerifiesUsers;

class VerifyController extends Controller
{
    use VerifiesUsers;

    /**
     * VerifyController constructor.
     */
    public function __construct()
    {
        if (config('verification.verify')) {
            $this->middleware($this->guestMiddleware());
        }
    }
}
