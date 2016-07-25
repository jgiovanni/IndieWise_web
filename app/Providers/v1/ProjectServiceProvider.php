<?php

namespace IndieWise\Providers\v1;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use IndieWise\Project;
use IndieWise\Rating;

class ProjectServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        /*Rating::creating(function ($rating){
            $column = !!$rating->up && !$rating->down ? 'rateUpCount' : 'rateDownCount';
            DB::table('Project')->where('id', $rating->project_id)->increment($column);
            return true;
        });

        Rating::updating(function ($rating){
            dd($rating);
            $dbRow = DB::table('Rating')->where('project_id')->first();
            return false;
        });

        Rating::deleting(function ($rating){
            $column = !!$rating->up && !$rating->down ? 'rateUpCount' : 'rateDownCount';
            DB::table('Project')->where('id', $rating->project_id)->decrement($column);
            return false;
        });*/

    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
