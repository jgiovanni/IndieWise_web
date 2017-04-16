<?php

namespace App\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;

class ProjectRequest extends FormRequest
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
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $data = [
            'name' => 'required|max:255',
            'owner_id' => 'required|exists:users,id',
            'type_id' => 'required|exists:types,id',
            'language_id' => 'required|exists:languages,id',
            'filmingCountry_id' => 'required|exists:countries,id',
            'completionDate' => 'required|date|before:now',
            'hosting_type' => 'required|string|in:youtube,vimeo,HTML5,script',
//            'hosting_id' => 'string|max:255',
            'video_url' => 'required|string|max:255',
            'director' => 'required_unless:hosting_type,script|string|max:255',
            'writer' => 'required_unless:hosting_type,script|string|max:255',
            'producers' => 'required_unless:hosting_type,script|string|max:255',
            'genres' => 'required|array',
            'description' => 'string',
            'keyCast' => 'string',
            'tags' => 'string',
            'unlist' => 'required|boolean',
            'nsfw' => 'required|boolean',
            'disableProject' => 'boolean',
            'disableCritique' => 'required|boolean',
            'disableComments' => 'required|boolean',
            'copyrightOwner' => 'required|boolean',
        ];

        return $data;
    }
}
