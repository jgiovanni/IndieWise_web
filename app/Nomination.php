<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use Illuminate\Database\Eloquent\Model;
use IndieWise\Events\Event;

class Nomination extends Model
{
    use UuidForKey, Filterable, ActivityTrait;

    protected $table = 'Nomination';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at'];

    public function activityVerb()
    {
        return 'nominate';
    }

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

    public static function boot()
    {

        parent::boot();

        static::created(function($nomination) {

        });

        static::deleted(function($nomination) {

        });
    }

}
