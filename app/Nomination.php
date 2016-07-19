<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Nomination extends Model
{
    use UuidForKey, Filterable;

    protected $table = 'Nomination';

    public $dates = ['created_at', 'updated_at'];

    // Relations
    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function critique()
    {
        return $this->belongsTo(Critique::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
