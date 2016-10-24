<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->resolving('payum.builder', function(\Payum\Core\PayumBuilder $payumBuilder) {
            $payumBuilder
                // this method registers filesystem storages, consider to change them to something more
                // sophisticated, like eloquent storage
                ->addDefaultStorages()

                ->addGateway('paypal_pro_checkout', [
                    'factory' => 'paypal_express_checkout',
                    'username' => 'EDIT ME',
                    'password' => 'EDIT ME',
                    'signature' => 'EDIT ME',
                    'sandbox' => true
                ])
                ->addGateway('stripe_checkout', [
                    'factory' => 'stripe_checkout',
                    'publishable_key' => 'EDIT ME',
                    'secret_key' => 'EDIT ME',
                ])
                ->addGateway('stripe_js', [
                    'factory' => 'stripe_js',
                    'username' => 'EDIT ME',
                    'password' => 'EDIT ME',
                    'signature' => 'EDIT ME',
                    'sandbox' => true
                ]);
        });
    }
}
