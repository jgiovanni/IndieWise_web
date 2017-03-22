<?php

namespace App\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;

class NominationRequest extends FormRequest
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
        return [
            'award_id' => 'required|exists:awards,id',
            'critique_id' => 'required|exists:critiques,id',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
        ];
        // TODO: limit nomination to 1 per project by user
    }
}
