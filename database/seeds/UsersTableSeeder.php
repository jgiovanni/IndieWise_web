<?php

use Illuminate\Database\Seeder;
use IndieWise\User;

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->truncate();
        $json = File::get("database/data/users.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            User::create(array(
                'id' => $obj->id,
                'avatar' => $obj->avatar,
                'country_id' => $obj->country,
                'coverPhoto' => $obj->coverPhoto,
                'dob' => $obj->dob,
                'email' => $obj->email,
                'firstName' => $obj->firstName,
                'lastName' => $obj->lastName,
                'password' => $obj->bcryptPassword,
                'gender' => $obj->gender,
                'username' => $obj->username,
                'url_id' => $obj->url_id,
                'website' => $obj->website,
                'urlFacebook' => $obj->urlFacebook,
                'urlTwitter' => $obj->urlTwitter,
                'urlGoogle' => $obj->urlGoogle,
            ));
        }
    }

}