<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->string('cca2', 60);
            $table->string('cca3', 60);
            $table->string('ccn3', 60);
            $table->string('cioc', 60);
            $table->string('demonym', 60)->nullable();
            $table->string('region', 60)->nullable();
            $table->string('subregion', 60)->nullable();
            $table->string('area', 60)->nullable();
            $table->string('capital', 60)->nullable();
            $table->string('name', 60);
            $table->string('regionCode', 60)->nullable();
            $table->string('subregionCode', 60)->nullable();
            $table->boolean('landlocked')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('countries');
    }
}
