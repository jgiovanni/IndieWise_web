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

    protected $guarded = ['id', 'url_id'];

    protected $with = ['owner', 'genres', 'type', 'filmingCountry', 'language'];

//    protected $appends = [];

    public $dates = ['created_at', 'updated_at', 'deleted_at', 'completionDate'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'copyrightOwner' => 'boolean',
        'disableComments' => 'boolean',
        'disableCritique' => 'boolean',
        'disableProject' => 'boolean',
        'nsfw' => 'boolean',
        'unlist' => 'boolean',
        'iwRating' => 'float'
    ];

    /*
     * Set Bool values
     */
    public function setUnlistAttribute($val)
    {
        $this->attributes['unlist'] = (boolean)($val);
    }
    public function setNsfwAttribute($val)
    {
        $this->attributes['nsfw'] = (boolean)($val);
    }
    public function setDisableProjectAttribute($val)
    {
        $this->attributes['disableProject'] = (boolean)($val);
    }
    public function setDisableCritiqueAttribute($val)
    {
        $this->attributes['disableCritique'] = (boolean)($val);
    }
    public function setDisableCommentsAttribute($val)
    {
        $this->attributes['disableComments'] = (boolean)($val);
    }
    public function setCopyrightOwnerAttribute($val)
    {
        $this->attributes['copyrightOwner'] = (boolean)($val);
    }

    // Scopes
    public function scopeListed($query)
    {
        return $query->where('unlist', 0);
    }
     /* Relations */
    //  Child of
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function activityActorMethodName()
    {
        return 'owner';
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
        return $this->belongsToMany(Genre::class, 'Genreables');
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

    /*public function playlistsItems()
    {
        return $this->hasMany(PlaylistItem::class);
    }*/

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function upRatings()
    {
        return $this->hasMany(Rating::class)->where('up', true);
    }

    public function downRatings()
    {
        return $this->hasMany(Rating::class)->where('down', true);
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

    public function syncGenres($ids)
    {
        $this->genres()->sync($ids);
    }

}
