<?php

namespace IndieWise\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
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
//        'IndieWise\Events\SomeEvent' => [
//            'IndieWise\Listeners\EventListener',
//        ],
        /*'RatingCreated' => [
            'IndieWise\Listeners\ProjectListener@RatingCreated',
        ],
        'RatingDeleted' => [
            'IndieWise\Listeners\ProjectListener@RatingDeleted',
        ],
        'ReactionCreated' => [
            'IndieWise\Listeners\ProjectListener@ReactionCreated',
        ],
        'ReactionDeleted' => [
            'IndieWise\Listeners\ProjectListener@ReactionDeleted',
        ],
        'CritiqueCreated' => [
            'IndieWise\Listeners\ProjectListener@CritiqueCreated',
        ],
        'CritiqueDeleted' => [
            'IndieWise\Listeners\ProjectListener@CritiqueDeleted',
        ],
        'NominationCreated' => [
            'IndieWise\Listeners\ProjectListener@NominationCreated',
        ],
        'NominationDeleted' => [
            'IndieWise\Listeners\ProjectListener@NominationDeleted',
        ],
        'WinCreated' => [
            'IndieWise\Listeners\ProjectListener@WinCreated',
        ],
        'WinDeleted' => [
            'IndieWise\Listeners\ProjectListener@WinDeleted',
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
