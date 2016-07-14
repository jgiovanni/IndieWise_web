<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary()->unique();
            $table->uuid('country_id')->index()->references('id')->on('countries');
            $table->string('firstName')->nullable();
            $table->string('lastName')->nullable();
//            $table->string('fullName')->nullable();
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('gender', 10)->nullable();
            $table->string('website')->nullable();
            $table->string('username')->nullable();
            $table->string('urlFacebook')->nullable();
            $table->string('urlTwitter')->nullable();
            $table->string('urlGoogle')->nullable();
            $table->string('url_id')->unique();
            $table->string('facebook_id')->unique();
            $table->text('avatar')->nullable();
            $table->text('coverPhoto')->nullable();
            $table->text('bio')->nullable();
            $table->date('dob')->nullable();
            $table->boolean('public')->default(true);
            $table->boolean('admin')->default(false);
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
