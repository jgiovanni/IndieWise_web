<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('actor_id')->index()->nullable()->references('id')->on('users');
            $table->uuid('project_id')->index()->references('id')->on('projects');
            $table->uuid('comment_id')->index()->references('id')->on('comments');
            $table->uuid('critique_id')->index()->references('id')->on('critiques');
            $table->uuid('nomination_id')->index()->references('id')->on('nominations');
            $table->uuid('rating_id')->index()->references('id')->on('ratings');
            $table->uuid('reaction_id')->index()->references('id')->on('reactions');
            $table->uuid('win_id')->index()->references('id')->on('wins');
            $table->string('verb', 20);
            $table->text('userIds')->nullable();
            $table->boolean('seen')->default(false);
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
        Schema::drop('actions');
    }
}
