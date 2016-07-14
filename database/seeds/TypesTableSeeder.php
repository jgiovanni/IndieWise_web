<?php

use Illuminate\Database\Seeder;
use IndieWise\Type;

class TypeTableSeeder extends Seeder {

    public function run()
    {
        DB::table('types')->truncate();
        $json = File::get("database/data/types.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Type::create(array(
                'id' => $obj->id,
                'name' => $obj->name,
                'slug' => $obj->slug,
            ));
        }
    }

}