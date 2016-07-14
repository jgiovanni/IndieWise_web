<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCritiquesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('critiques', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('project_id')->index()->references('id')->on('projects');
            $table->uuid('author_id')->index()->references('id')->on('users');
            $table->decimal('audio', 2, 2)->unsigned()->default(0);
            $table->decimal('cinematography', 2, 2)->unsigned()->default(0);
            $table->decimal('direction', 2, 2)->unsigned()->default(0);
            $table->decimal('music', 2, 2)->unsigned()->default(0);
            $table->decimal('project', 2, 2)->unsigned()->default(0);
            $table->decimal('author', 2, 2)->unsigned()->default(0);
            $table->decimal('originality', 2, 2)->unsigned()->default(0);
            $table->decimal('overall', 2, 2)->unsigned()->default(0);
            $table->decimal('pacing', 2, 2)->unsigned()->default(0);
            $table->decimal('performance', 2, 2)->unsigned()->default(0);
            $table->decimal('production', 2, 2)->unsigned()->default(0);
            $table->decimal('structure', 2, 2)->unsigned()->default(0);
            $table->decimal('writing', 2, 2)->unsigned()->default(0);
            $table->integer('commentCount')->unsigned()->default(0);
            $table->string('url_id')->unique();
            $table->text('body')->nullable();
            $table->boolean('private')->default(false);
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
        Schema::drop('critiques');
    }
}
