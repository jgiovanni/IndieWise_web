<?php

namespace App;

use Carbon\Carbon;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountService
{
    public function createOrGetUser(ProviderUser $providerUser, $provider = 'facebook')
    {
        $account = SocialAccount::whereProvider($provider)
            ->whereProviderUserId($providerUser->getId())
            ->first();


        if ($account) {
            return $account->user;
        } else {
            $account = SocialAccount::whereProvider('facebook')
                ->whereProviderUserId($providerUser->getId())
                ->first();

            if ($account){
                if ($account->provider === 'facebook' && $provider !== 'facebook') {
                    $account->provider = $provider;
                    $account->save();
                }
            }
        }

        if ($account) {
            return $account->user;
        } else {
            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => $provider
            ]);

            $user = User::whereEmail($providerUser->getEmail())->first();

            if (!$user) {

                $name_parts = preg_split('/\s+/', $providerUser->getName());

                $data = collect([
                    'email' => $providerUser->getEmail(),
                ]);

                $userData = [
                    'email' => $providerUser->getEmail(),
                    'username' => $providerUser->getEmail(),
                    'avatar' => $providerUser->getAvatar(),
                    'fullName' => $providerUser->getName(),
                    'gender' => isset($providerUser->user["gender"]) ? $providerUser->user["gender"] : null,
                    'firstName' => $name_parts[0],
                    'lastName' => end($name_parts),
                    'ip_used' => request()->ip(),
                    'verified' => true,
                    'verified_at' => Carbon::now()->toDateTimeString()
                ];

                if ($provider === 'facebook') {
                    $userData['verified'] = isset($providerUser->user["verified"]) ? $providerUser->user["verified"] : false;
                    $userData['verified_at'] = (isset($providerUser->user["verified"]) && $providerUser->user["verified"] === true) ? Carbon::now()->toDateTimeString() : null;
                }

//                User::unguard();
                $user = User::create($userData);
//                User::reguard();

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
            }

            $account->user()->associate($user);
            $account->save();

            return $user;

        }

    }
}