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
            return $this->withCount('projects', 'wins', 'critiques', 'nominations' ,'reactions');
        }
    }

}