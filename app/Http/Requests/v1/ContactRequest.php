<?php

namespace IndieWise\Http\Requests\v1;

use Dingo\Api\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'to' => 'required|email|in:support@getindiewise.com,safeguard@getindiewise.com,marketing@getindiewise.com,awards@getindiewise.com,pr@getindiewise.com,careers@getindiewise.com,sponsor@getindiewise.com,investors@getindiewise.com,convention@getindiewise.com,feedback@getindiewise.com',
            'email' => 'required|email',
            'name' => 'required|string',
            'subject' => 'required|string',
            'message' => 'required|string'
        ];
    }
}
