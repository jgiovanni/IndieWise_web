<?php

namespace IndieWise;

use EloquentFilter\Filterable;
use Grimthorr\LaravelUserSettings\Setting;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cmgmyr\Messenger\Traits\Messagable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Support\Facades\Hash;
use Jrean\UserVerification\Facades\UserVerification;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable implements JWTSubject, AuthenticatableContract, CanResetPasswordContract
{
    use CanResetPassword, SoftDeletes, Filterable, UuidForKey, Messagable, EntrustUserTrait;


    protected $table = 'users';

    protected $guarded = ['url_id', 'public', 'id'];

    protected $hidden = ['password', 'remember_token'];

    protected $appends = ['fullName', 'user_id', 'user_hash'];

    public $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [ 'settings' => 'json' ];


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
    public function getPasswordAttribute()
    {
        return $this->attributes['password'];
    }

    public function getFullNameAttribute()
    {
        return $this->attributes['firstName'] . ' ' . $this->attributes['lastName'];
    }

    public function getUserIdAttribute()
    {
        return $this->attributes['id'];
    }

    public function getUserHashAttribute()
    {
        return hash_hmac("sha256", $this->attributes['id'], "IyW66SD_5ohnI6zok0zWtPoZRf7QS32jNv9wfkg8");
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
        return $this->belongsTo(Country::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'owner_id');
    }

    public function wins()
    {
        return $this->hasMany(Win::class, 'owner_id');
    }

    public function critiques()
    {
        return $this->hasMany(Critique::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'Genreables');
    }

    public function syncGenres($ids)
    {
        $this->genres()->sync($ids);
    }

    public function syncSettings($settings)
    {
        setting('test', true, "'$this->id'");
        /*foreach ($settings as $key => $setting) {
            setting()->set($key, $setting, "'$this->id'");
        }*/
        setting()->save("'$this->id'");
    }

    public function types()
    {
        return $this->belongsToMany(Type::class, 'UserTypes');
    }

    public function syncTypes($ids)
    {
        $this->types()->sync($ids);
    }

    public function nominations()
    {
        return $this->hasMany(Nomination::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function playlists()
    {
        return $this->hasMany(Playlist::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function threads()
    {
        return $this->belongsToMany(Thread::class, 'messages', 'user_id', 'thread_id')
            ->withTimestamps()
            ->withPivot(['body'])
            ->groupBy('thread_id')
            ->latest('updated_at');
    }

    public static function boot()
    {
        parent::boot();

        static::created(function($user) {
//            UserVerification::generate($user);
//            UserVerification::sendQueue($user, $subject = 'IndieWise: Account Verification', $from = 'noreply@getindiewise.com', $name = 'IndieWise Registration');

//            Event::fire('win.created', $win);
        });

        static::deleted(function($user) {
//            Event::fire('win.deleted', $win);
        });
    }

}