<?php

use Illuminate\Database\Seeder;
use IndieWise\Genre;

class GenreTableSeeder extends Seeder {

    public function run()
    {
        DB::table('genres')->truncate();
        $json = File::get("database/data/genres.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Genre::create(array(
                "id" => $obj->id,
                'name' => $obj->name,
                'slug' => $obj->slug,
            ));
        }
    }

}