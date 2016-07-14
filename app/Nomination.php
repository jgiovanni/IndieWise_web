<?php

namespace IndieWise;

use Illuminate\Database\Eloquent\Model;

class Nomination extends Model
{



    // Relations
    public function critique()
    {
        return $this->belongsTo('IndieWise\Critique');
    }
}
