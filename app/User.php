<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cmgmyr\Messenger\Traits\Messagable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Authenticatable implements JWTSubject, AuthenticatableContract, CanResetPasswordContract
{
    use CanResetPassword, SoftDeletes, Filterable, Messagable, UuidForKey;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['url_id', 'public', 'id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $appends = ['fullName'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Passwords must always be hashed
     *
     * @param $password
     */
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
    }

    // Mutators
    public function getFullNameAttribute()
    {
        return $this->attributes['firstName'] . ' ' . $this->attributes['lastName'];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims(){
        return [];
    }

    // Relations
    public function country()
    {
        return $this->belongsTo('IndieWise\Country');
    }

    public function projects()
    {
        return $this->hasMany('IndieWise\Project', 'id', 'owner_id');
    }

    public function critiques()
    {
        return $this->hasMany('IndieWise\Critique');
    }

    public function comments()
    {
        return $this->hasMany('IndieWise\Comment');
    }

    public function reactions()
    {
        return $this->hasMany('IndieWise\Reaction');
    }

    public function genres()
    {
        return $this->morphToMany('IndieWise\Genre', 'genres_selected');
    }

    public function nominations()
    {
        return $this->hasMany('IndieWise\Nomination');
    }

    public function ratings()
    {
        return $this->hasMany('IndieWise\Rating');
    }

    public function playlists()
    {
        return $this->hasMany('IndieWise\Playlist');
    }

    public function actions()
    {
        return $this->hasMany('IndieWise\Action');
    }
}