<?php

namespace IndieWise;

use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountService
{
    public function createOrGetUser(ProviderUser $providerUser)
    {
        $account = SocialAccount::whereProvider('facebook')
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        } else {

            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => 'facebook'
            ]);

            $user = User::whereEmail($providerUser->getEmail())->first();

            if (!$user) {

                $name_parts = preg_split('/\s+/', $providerUser->getName());
                $user = User::create([
                    'email' => $providerUser->getEmail(),
                    'username' => $providerUser->getEmail(),
                    'avatar' => $providerUser->getAvatar(),
                    'fullName' => $providerUser->getName(),
                    'firstName' => $name_parts[0],
                    'lastName' => end($name_parts),
                ]);

                // Add playlists
                Playlist::create(['name' => 'Favorites', 'user_id' => $user->id]);
                Playlist::create(['name' => 'Watch Later', 'user_id' => $user->id]);

            }

            $account->user()->associate($user);
            $account->save();

            return $user;

        }

    }
}