<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenreablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('genreables', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('genre_id')->index()->references('id')->on('genres');
            $table->uuid('genreables_id')->index();
            $table->string('genreables_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('genreables');
    }
}
