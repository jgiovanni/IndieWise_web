<?php

namespace App\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;

class CritiqueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'project_id' => 'required|exists:Project,id',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
