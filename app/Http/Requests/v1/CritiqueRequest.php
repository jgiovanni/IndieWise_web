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
        if($this->isMethod('post')) {
            return ($this->user());
        }
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
            'audio' => 'required|numeric',
            'cinematography' => 'required|numeric',
            'direction' => 'required|numeric',
            'music' => 'required|numeric',
            'originality' => 'required|numeric',
            'overall' => 'required|numeric',
            'pacing' => 'required|numeric',
            'performances' => 'required|numeric',
            'private' => 'required|boolean',
            'production' => 'required|numeric',
            'structure' => 'required|numeric',
            'writing' => 'required|numeric',
            'body' => 'required',
            'project_id' => 'required|exists:Project,id',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
