<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            // add your listeners (aka providers) here
            'SocialiteProviders\Twitter\TwitterExtendSocialite@handle',
        ],
//        'App\Events\SomeEvent' => [
//            'App\Listeners\EventListener',
//        ],
        /*'RatingCreated' => [
            'App\Listeners\ProjectListener@RatingCreated',
        ],
        'RatingDeleted' => [
            'App\Listeners\ProjectListener@RatingDeleted',
        ],
        'ReactionCreated' => [
            'App\Listeners\ProjectListener@ReactionCreated',
        ],
        'ReactionDeleted' => [
            'App\Listeners\ProjectListener@ReactionDeleted',
        ],
        'CritiqueCreated' => [
            'App\Listeners\ProjectListener@CritiqueCreated',
        ],
        'CritiqueDeleted' => [
            'App\Listeners\ProjectListener@CritiqueDeleted',
        ],
        'NominationCreated' => [
            'App\Listeners\ProjectListener@NominationCreated',
        ],
        'NominationDeleted' => [
            'App\Listeners\ProjectListener@NominationDeleted',
        ],
        'WinCreated' => [
            'App\Listeners\ProjectListener@WinCreated',
        ],
        'WinDeleted' => [
            'App\Listeners\ProjectListener@WinDeleted',
        ],*/
    ];

    /**
     * Register any other events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
