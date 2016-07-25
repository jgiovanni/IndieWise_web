<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
use Illuminate\Database\Eloquent\Model;
use IndieWise\Events\Event;

class Rating extends Model
{
    use UuidForKey, Filterable, ActivityTrait;

    protected $table = 'Rating';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at'];

    public function activityVerb()
    {
        return 'rate';
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function activityActorMethodName()
    {
        return 'author';
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
