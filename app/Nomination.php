<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Nomination extends Model
{
    use UuidForKey;

    protected $table = 'Nomination';


    // Relations
    public function critique()
    {
        return $this->belongsTo('IndieWise\Critique');
    }
}
