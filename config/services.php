<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, Mandrill, and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'mandrill' => [
        'secret' => env('MANDRILL_SECRET'),
    ],

    'ses' => [
        'key'    => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'stripe' => [
        'model'  => IndieWise\User::class,
        'key'    => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'facebook' => [
        'client_id' => '150687055270744',
        'client_secret' => '7d611466ddac25c2f70bc06cc73d4af1',
        'redirect' => env('SOCIALITE_FACEBOOK_REDIRECT', 'http://indiewise.dev/auth/facebook/callback'),
    ],
    'twitter' => [
        'client_id' => 'nnSvvHd86gBpxPwJaLGvzM2Mm',
        'client_secret' => 'TbzbhcsQIDzbNLPrDfyirstXTJXI71WANCISNjf4NImzXACHZq',
        'redirect' => env('SOCIALITE_FACEBOOK_REDIRECT', 'http://indiewise.dev/auth/twitter/callback'),
    ],
    'google' => [
        'client_id' => '322274582930-4m1dueb708gvdic28n12e5dhqq121a6b.apps.googleusercontent.com',
        'client_secret' => '6kjGiH7lv9fCoXzf3HjS4X3f',
        'redirect' => env('SOCIALITE_FACEBOOK_REDIRECT', 'http://indiewise.dev/auth/google/callback'),
    ],

];
