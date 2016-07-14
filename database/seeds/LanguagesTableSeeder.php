<?php

use Illuminate\Database\Seeder;
use IndieWise\Language;

class LanguageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->truncate();
        $json = File::get("database/data/languages.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Language::create(array(
                "id" => $obj->id,
                'english' => $obj->English,
                'alpha2' => $obj->alpha2,
                'alpha3' => $obj->alpha3,
            ));
        }
    }
}
