<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use UuidForKey, Filterable;
    //
    protected $table = 'Reaction';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
