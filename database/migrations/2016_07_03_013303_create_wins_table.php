<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wins', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('award_id')->index()->references('id')->on('awards');
            $table->uuid('project_id')->index()->references('id')->on('projects');
            $table->uuid('owner_id')->index()->references('id')->on('users');
            $table->boolean('rewarded')->default(false);
            $table->timestamp('rewarded_at')->nullable();
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
        Schema::drop('wins');
    }
}
