<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenreSelectedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('genre_selected', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('genre_id')->index()->references('id')->on('genres');
            $table->uuid('genre_selected_id')->index();
            $table->string('genre_selected_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('genre_selected');
    }
}
