<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use UuidForKey;
    //
    protected $table = 'action';

    protected $guarded = ['id'];

    public $dates = ['created_at', 'updated_at'];

    public function user(){
        return $this->belongsTo(User::class);
    }


}
