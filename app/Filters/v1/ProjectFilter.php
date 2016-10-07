<?php

namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class ProjectFilter extends ModelFilter
{

    public $relations = [];

    public function listed()
    {
        return $this->where('unlist', false);
    }

    public function owner($owner)
    {
        return $this->where('owner_id', $owner);
    }

    public function notOwner($owner)
    {
        return $this->where('owner_id', '<>', $owner);
    }

    public function notVideo($notVideo)
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

    public function random()
    {
        return $this->orderByRaw("RAND()");
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
                        ->orWhere('lastName', 'LIKE', strtolower("%$search%"))
                        ->orWhere('fullName', 'LIKE', strtolower("%$search%"));
                });
        });
    }
    
    public function sort($sort)
    {
        $sortable = [
            'topRating', 'iwRating', 'critiques_count', 'wins_count', 'reactions_count', 'created_at', 'name'
        ];

        $param = preg_split('/\|+/', $sort);
        $field = $param[0];
        $direction = isset($param[1]) ? $param[1] : 'desc';

        if (in_array($field, $sortable)) {
            if ($field === 'topRating') {
                return $this->withCount(['critiques' => function ($query) {
                    $query->where('overall', '>=', 9);
                }])->orderBy('critiques_count', $direction)->limit(8);
            }
            if ($field === 'iwRating') {
                return $this->orderBy($field, $direction)->orderBy('critiques_count', $direction);
            }
            return $this->orderBy($field, $direction);
        }
        return $this;
    }
}