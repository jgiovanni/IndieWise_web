<?php
 namespace IndieWise;

 use Ramsey\Uuid\Uuid;
 use Vinkla\Hashids\Facades\Hashids;

 trait UuidForKey
 {
     public static function bootUuidForKey()
     {
         static::creating(function ($model) {
             $model->incrementing = false;
             $uuid = Uuid::uuid4();
             $model->{$model->getKeyName()} = (string) $uuid;

             // if 'url_id' exists add hash
             if (Schema::hasColumn($model->getTable(), 'url_id')) {
                 $model->{'url_id'} = (string) Hashids::encode(microtime(false));
             }
         });
     }

     public function getCasts()
     {
         return $this->casts;
     }
 }