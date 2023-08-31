<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class PostPerusahaanRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nama_perusahaan' => 'required|string',
            'alamat_perusahaan' => 'required|string',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ], 400));
    }
    public function messages()
    {
        return [
            'nama_perusahaan.required' => 'nama_perusahaan is required',
            'alamat_perusahaan.required' => 'alamat_perusahaan is required'
        ];
    }
}
