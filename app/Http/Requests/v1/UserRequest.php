<?php

namespace IndieWise\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;
use Dingo\Api\Http\Request;

class   UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @param Request $request
     * @return bool
     */
    public function authorize(Request $request)
    {
        if ($this->isMethod('put')) {
            return $this->user()->id === $this->get('id');
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
        if ($this->isMethod('post')) {
            return [
                'firstName' => 'required|max:100',
                'lastName' => 'required|max:100',
                'email' => 'required|email|unique:users,email',
                // 'username' => 'required|unique:users,username',
                'password' => 'required|confirmed|min:6',
                'gender' => 'required|in:male,female',
                'country_id' => 'required|exists:Country,id'
            ];
        }
        return [
            'genres' => 'array',
            'types' => 'array',
        ];

    }
}
