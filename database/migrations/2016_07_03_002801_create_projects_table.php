<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Project', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('language_id')->index()->references('id')->on('languages');
            $table->uuid('filmingCountry_id')->index()->references('id')->on('countries');
            $table->uuid('owner_id')->index()->references('id')->on('users');
            $table->uuid('type_id')->index()->references('id')->on('types');
            $table->bigInteger('awardCount')->unsigned()->default(0);
            $table->bigInteger('commentCount')->unsigned()->default(0);
            $table->bigInteger('critiqueCount')->unsigned()->default(0);
            $table->bigInteger('nominationCount')->unsigned()->default(0);
            $table->bigInteger('rateUpCount')->unsigned()->default(0);
            $table->bigInteger('rateDownCount')->unsigned()->default(0);
            $table->bigInteger('reactionCount')->unsigned()->default(0);
            $table->decimal('runTime');
            $table->decimal('iwRating')->default(0);
            $table->string('name');
            $table->string('url_id')->unique();
            $table->string('video_id')->nullable();
            $table->string('video_url')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->string('hosting_id')->nullable();
            $table->string('hosting_type', 10)->nullable();
            $table->string('director')->nullable();
            $table->string('writer')->nullable();
            $table->string('producers')->nullable();
            $table->date('completionDate')->nullable();
            $table->text('description')->nullable();
            $table->text('keyCast')->nullable();
            $table->text('tags')->nullable();
            $table->boolean('disableComments')->default(false);
            $table->boolean('disableCritiques')->default(false);
            $table->boolean('disableProject')->default(false);
            $table->boolean('nsfw')->default(false);
            $table->boolean('copyrightOwner')->default(false);
            $table->boolean('unlist')->default(false);
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
        Schema::drop('projects');
    }
}
