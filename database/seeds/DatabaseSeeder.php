<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(TypeTableSeeder::class);
        $this->call(GenreTableSeeder::class);
        $this->call(CountryTableSeeder::class);
        $this->call(LanguageTableSeeder::class);
        $this->call(AwardTableSeeder::class);
        
        $this->call(UserTableSeeder::class);
        $this->call(ProjectTableSeeder::class);

        Model::reguard();
    }
}
