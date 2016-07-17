<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Project extends Model
{
    use SoftDeletes, Filterable, UuidForKey;

    protected $table = 'Project';

    protected $guarded = ['url_id'];

    protected $with = ['owner', 'genres', 'type', 'filmingCountry'];

    protected $appends = [];

    public $dates = ['created_at', 'updated_at', 'deleted_at', 'completionDate'];

     /* Relations */
    //  Child of
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function filmingCountry()
    {
        return $this->belongsTo(Country::class, 'filmingCountry_id');
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    // Children
    public function critiques()
    {
        return $this->hasMany(Critique::class);
    }

    public function genres()
    {
        return $this->hasMany(SelectedGenres::class, 'project');
    }

    public function wins()
    {
        return $this->hasMany(Win::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function nominations()
    {
        return $this->hasMany(Nomination::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    // Siblings
    public function watches()
    {
        return $this->hasOne(Watch::class);
    }


}
