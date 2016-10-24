<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    protected $table = 'Watched';

    protected $primaryKey = 'project_id'; // or null

    public $incrementing = false;

    protected $guarded = [];

    public function project()
    {
        return $this->hasOne(Project::class);
    }

}
