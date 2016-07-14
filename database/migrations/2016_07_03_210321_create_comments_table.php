<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('critique_id')->index()->references('id')->on('critiques');
            $table->uuid('comment_id')->index()->nullable()->references('id')->on('comments');
            $table->uuid('author_id')->index()->references('id')->on('users');
            $table->text('body')->nullable();
            $table->integer('replyCount', false, true)->default(0);
            $table->timestamp('edited_at')->nullable();
            $table->timestamp('replied_at')->nullable();
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
        Schema::drop('comments');
    }
}
