<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Win extends Model
{
    use SoftDeletes, UuidForKey;
    //
    protected $table = 'AwardWin';

    protected $fillable = ['award_id', 'project_id', 'owner_id'];

    public $dates = ['created_at', 'updated_at', 'rewarded_at', 'deleted_at'];

    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

}
