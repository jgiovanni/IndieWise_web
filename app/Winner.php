<?php

namespace App;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    use Filterable;
    //
    protected $table = 'winners';

    protected $guarded = ['order'];

    public $timestamps = false;

    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function win()
    {
        return $this->belongsTo(Win::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

}
