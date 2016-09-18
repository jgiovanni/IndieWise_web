<?php

namespace IndieWise\Filters\v1;

use EloquentFilter\ModelFilter;

class WinFilter extends ModelFilter
{

    public $relations = [
        'nominations' => ['award']
    ];

    public function user($user)
    {
        return $this->whereHas('project', function ($query) use ($user) {
            $query->where('owner_id', $user);
        });
    }

    public function notUser($user)
    {
        return $this->whereHas('project', function ($query) use ($user) {
            $query->where('owner_id', '<>', $user);
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

    public function award($award)
    {
        return $this->where('award_id', $award);
    }

    public function search($search)
    {
        if (is_array($search)) {
            $search = $search['value'];
        }

        return $this->where(function ($q) use ($search) {
            return $q
                ->where('rewarded', $search)
                ->orWhereHas('award', function ($a) use ($search) {
                    return $a->where('name', 'LIKE',strtolower("%$search%"));
                })
                ->orWhereHas('project', function ($p) use ($search) {
                    return $p->where('name', 'LIKE',strtolower("%$search%"));
                })
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
            'created_at'
        ];

        $param = preg_split('/\|+/', $sort);
        $field = $param[0];
        $direction = isset($param[1]) ? $param[1] : 'desc';

        if (in_array($field, $sortable))
            return $this->orderBy($field, $direction);
        return $this;
    }

    public function counts($counts)
    {
        if ($counts) {
            return $this->withCount('nominations');
        }
    }

}