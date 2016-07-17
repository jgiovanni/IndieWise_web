<?php

namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class CritiqueFilter extends ModelFilter
{

    public $relations = [];

    public function user($user)
    {
        return $this->where('user_id', $user);
    }

    public function notUser($user)
    {
        return $this->where('user_id', '<>', $user);
    }

    public function project($project)
    {
        return $this->where('project_id', $project);
    }

    public function notProject($project)
    {
        return $this->where('project_id', '<>', $project);
    }

    /*public function notVideo($notVideo)
    {
        return $this->whereNotIn('id', explode(',', $notVideo));
    }

    public function types($types)
    {
        return $this->whereIn('type_id', explode(',', $types));
    }

    public function genres($genres)
    {
        return $this->whereHas('genres', function($query) use ($genres) {
            return $query->whereIn('id', explode(',', $genres));
        });
    }

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {
            return $q
                ->where('name', 'LIKE', strtolower("%$search%"))
                ->orWhere('description', 'LIKE', strtolower("%$search%"))
                ->orWhere('director', 'LIKE', strtolower("%$search%"))
                ->orWhere('keyCast', 'LIKE', strtolower("%$search%"))
                ->orWhere('tags', 'LIKE', strtolower("%$search%"))
                ->orWhere('writer', 'LIKE', strtolower("%$search%"))
                ->orWhere('producers', 'LIKE', strtolower("%$search%"))
                ->orWhere('completionDate', 'LIKE', strtolower("%$search%"))
                ->orWhere('writer', 'LIKE', strtolower("%$search%"))
                ->orWhereHas('owner', function ($u) use ($search) {
                    return $u
                        ->where('firstName', 'LIKE',strtolower("%$search%"))
                        ->orWhere('lastName', 'LIKE', strtolower("%$search%"));
                });
        });
    }*/
    
    public function sort($sort)
    {
        $sortable = [
            'created_at'
        ];

        $param = preg_split('/\|+/', $sort);
        $field = $param[0];
        $direction = isset($param[1]) ? $param[1] : 'desc';

        if (in_array($field, $sortable))
            return $this->orderBy($field, $direction);
        return $this;
    }
}