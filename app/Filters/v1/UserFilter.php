<?php

namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class UserFilter extends ModelFilter
{
    public $relations = [];

    public function notUsers($users) {
        return $this->whereNotIn('id', explode(',', $users));
    }

    public function users($users) {
        return $this->whereIn('id', explode(',', $users));
    }

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {
            return $q
                ->where('firstName', 'LIKE', strtolower("%$search%"))
                ->orWhere('lastName', 'LIKE', strtolower("%$search%"))
                ->orWhere('fullName', 'LIKE', strtolower("%$search%"));
//                ->orWhere('email', 'LIKE', strtolower("%$search%"))
//                ->orWhere('username', 'LIKE', strtolower("%$search%"));
        });
    }

}