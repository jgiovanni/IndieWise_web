<?php

namespace App\Providers\v1;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use App\Project;
use App\Critique;

class ProjectServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
/*        Critique::creating(function ($critique){
            dd('here');
            $this->updateIndieWiseAverage($critique->project_id);
            return true;
        });

        Critique::updating(function ($critique){
            dd('here');
            $this->updateIndieWiseAverage($critique->project_id);
            return false;
        });

        Critique::deleting(function ($critique){
            dd('here');
            $this->updateIndieWiseAverage($critique->project_id);
            return false;
        });*/

    }

    /**
     * Recalculate the indiewise average for the Project
     * @param $id
     */
    private function updateIndieWiseAverage($id)
    {
        DB::update('UPDATE Project p INNER JOIN ( SELECT (SUM(c.overall) / count(*)) AS iwAverage, c.project_id FROM critiques c GROUP BY c.project_id) AS crit ON crit.project_id = p.id SET p.iwRating = crit.iwAverage WHERE p.id = :id', [$id]);
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
