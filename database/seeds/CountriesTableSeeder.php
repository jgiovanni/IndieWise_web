<?php

use Illuminate\Database\Seeder;
use IndieWise\Country;

class CountryTableSeeder extends Seeder {

    public function run()
    {
        DB::table('countries')->truncate();
        $json = File::get("database/data/countries.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Country::create(array(
                "id" => $obj->id,
                'name' => $obj->name,
                'cca2' => $obj->cca2,
                'cca3' => $obj->cca3,
                'ccn3' => $obj->ccn3,
                'cioc' => $obj->cioc,
                'demonym' => $obj->demonym,
                'landlocked' => $obj->landlocked,
                'region' => $obj->region,
                'subregion' => $obj->subregion,
                'regionCode' => $obj->regionCode,
                'subregionCode' => $obj->subregionCode,
                'capital' => $obj->capital,
                'area' => $obj->area,
            ));
        }
    }

}