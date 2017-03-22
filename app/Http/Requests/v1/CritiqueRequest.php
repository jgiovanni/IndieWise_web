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
        if ($this->isMethod('post')) {
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
            // Common Fields
            'overall' =>        'required|numeric',
            'private' =>        'required|boolean',
            'body' =>           'required',
            'project_id' =>     'required|exists:projects,id',
            'user_id' =>        'required|exists:users,id',
            'type' =>           'required|in:video,script|string',

            // Shared Type values
            'writing' =>        'required|numeric', // aka plot
            'structure' =>      'required|numeric',
            'pacing' =>         'required|numeric',
            'originality' =>    'required|numeric',

            // Type Video only
            'audio' =>          'required_if:type,video|numeric',
            'cinematography' => 'required_if:type,video|numeric',
            'direction' =>      'required_if:type,video|numeric',
            'music' =>          'required_if:type,video|numeric',
            'performances' =>   'required_if:type,video|numeric',
            'production' =>     'required_if:type,video|numeric',

            // Type Script only
            //'potential' =>      'required_if:type,script|numeric',
            'style' =>          'required_if:type,script|numeric',
            'theme' =>          'required_if:type,script|numeric',
            'dialogue' =>       'required_if:type,script|numeric',
            'characters' =>     'required_if:type,script|numeric',
            'presentation' =>   'required_if:type,script|numeric',
            'concept' =>        'required_if:type,script|numeric',
        ];
    }
}
