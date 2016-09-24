<?php

namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class AwardFilter extends ModelFilter
{
    public $relations = [];

    public function user($user)
    {
        return $this->where('user_id', $user);
    }

    public function notUser($user)
    {
        return $this->where('user_id', '<>', $user)
            ->whereHas('project', function ($query) use ($user) {
                $query->where('owner_id', $user);
            });
    }

    public function project($project)
    {
        return $this->where('project_id', $project);
    }

    public function notProject($project)
    {
        return $this->where('project_id', '<>', $project);
    }

    public function critique($critique)
    {
        return $this->where('critique_id', $critique);
    }

    public function award($award)
    {
        return $this->where('award_id', $award);
    }

    public function trailer($trailer)
    {
        if ($trailer){
            return $this->whereIn('id', [
                'dd3eaddf-1cce-11e6-b1e1-e12b04098a26',
                '7e42d9bd-1cce-11e6-b1e1-e12b04098a26',
                '75322f6b-1cce-11e6-a2ae-ad4c5d3797ab',
                '6950ef19-1cce-11e6-b1e1-e12b04098a26',
                'f327193f-28e6-11e6-b8db-86ac961c55b2',
                '3458107f-28e7-11e6-b8db-86ac961c55b2',
                '41395363-28e7-11e6-b8db-86ac961c55b2',
                '883c607e-28e7-11e6-b8db-86ac961c55b2',
                '9dc945b9-28e7-11e6-b8db-86ac961c55b2',
                'a4e45e82-28e7-11e6-b8db-86ac961c55b2',
                'ac128a32-28e7-11e6-b8db-86ac961c55b2',
                'af87e84b-28e7-11e6-8d88-f97eb8a09b17',
                'b46c2345-28ee-11e6-b8db-86ac961c55b2',
                'be953a15-28ee-11e6-b8db-86ac961c55b2',
                'ca1f2e22-28ee-11e6-b8db-86ac961c55b2',
                '15462612-28ef-11e6-8d88-f97eb8a09b17',
                '0f5adc74-28ef-11e6-b8db-86ac961c55b2',
                'd38fd1a9-28ee-11e6-8d88-f97eb8a09b17',
                'ed4d84dc-28ee-11e6-8d88-f97eb8a09b17',
                'f92bd818-28ee-11e6-b8db-86ac961c55b2',
                'ffdaae27-28ee-11e6-8d88-f97eb8a09b17',
            ]);
        }
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