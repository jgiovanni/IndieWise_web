<?php

use Illuminate\Database\Seeder;
use IndieWise\Award;

class AwardTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('awards')->truncate();
        $json = File::get("database/data/awards.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Award::create(array(
                "id" => $obj->id,
                'name' => $obj->name,
                'slug' => $obj->slug,
            ));
        }
    }
}
