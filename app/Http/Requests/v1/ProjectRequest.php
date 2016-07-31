<?php

namespace IndieWise\Http\Requests\v1;

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
            return ($this->user()->projects()->count() <= 3);
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
        return [
            'name' => 'required|max:255',
            'owner_id' => 'required|exists:users,id',
            'type_id' => 'required|exists:Type,id',
            'language_id' => 'required|exists:Language,id',
            'filmingCountry_id' => 'required|exists:Country,id',
            'completionDate' => 'required|date|before:now',
            'hosting_type' => 'required|string|max:255',
            'hosting_id' => 'required|string|max:255',
            'video_url' => 'required|string|max:255',
            'director' => 'required|string|max:255',
            'writer' => 'required|string|max:255',
            'producers' => 'required|string|max:255',
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
    }
}
