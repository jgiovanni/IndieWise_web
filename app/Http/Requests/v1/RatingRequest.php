<?php

namespace App\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;

class RatingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if ($this->isMethod('post')) {
            $rules = [
                'author_id' => 'required|string|exists:users,id',
                'project_id' => 'required|string|exists:projects,id',
                'up' => 'required|boolean',
                'down' => 'required|boolean',
            ];
        }

        if ($this->isMethod('put')) {
            $rules = [
                'up' => 'boolean',
                'down' => 'boolean',
            ];
        }

        return $rules;
    }
}
