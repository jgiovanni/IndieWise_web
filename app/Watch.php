<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    protected $table = 'Watched';

    protected $guarded = [];

    public function project()
    {
        return $this->hasOne(Project::class);
    }

}
