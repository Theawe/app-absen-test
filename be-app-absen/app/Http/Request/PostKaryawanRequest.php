<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class PostKaryawanRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nama_karyawan' => 'required|string',
            'umur_karyawan' => 'required|integer',
            'alamat_karyawan' => 'required|string',
            'nama_perusahaan' => 'required|string',
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
            'nama_karyawan.required' => 'nama_karyawan is required',
            'umur_karyawan.required' => 'umur_karyawan is required',
            'alamat_karyawan.required' => 'alamat_karyawan is required',
            'nama_perusahaan.required' => 'nama_perusahaan is required',

        ];
    }
}
