<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNominationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nominations', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('award_id')->index()->references('id')->on('awards');
            $table->uuid('project_id')->index()->references('id')->on('projects');
            $table->uuid('critique_id')->index()->references('id')->on('critique');
            $table->uuid('user_id')->index()->references('id')->on('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('nominations');
    }
}
