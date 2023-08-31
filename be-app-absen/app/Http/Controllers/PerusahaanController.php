<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostPerusahaanRequest;
use App\Models\Karyawan;
use App\Models\Perusahaan;
use Illuminate\Http\Request;

class PerusahaanController extends BaseController
{
    public function index()
    {
        $perusahaans = Perusahaan::orderBy('created_at', 'ASC')->get();
        return $this->sendResponse($perusahaans, 'Karyawans Retrieved Successfully.');
    }

    public function store(PostPerusahaanRequest $request): mixed
    {
        $peruahaan =  Perusahaan::create([
            'nama_perusahaan' => $request->nama_perusahaan,
            'alamat_perusahaan' => $request->alamat_perusahaan
        ]);
        return response()->json(
            $peruahaan,
            200
        );
    }

    public function insertToMySql(Request $request)
    {
        $peruahaan =  Perusahaan::create([
            'nama_perusahaan' => $request->nama_perusahaan,
            'alamat_perusahaan' => $request->alamat_perusahaan
        ]);
        return response()->json(
            $peruahaan,
            200
        );
    }

    public function insertToMongo(Request $request)
    {
        $this->validate($request, [
            'nama_karyawan' => 'required|string',
            'umur_karyawan' => 'required|integer',
            'alamat_karyawan' => 'required|string',
            'nama_perusahaan' => 'required|string'
        ]);

        $karyawan =  Karyawan::create(
            [
                'nama_karyawan' => $request->nama_karyawan,
                'umur_karyawan' => $request->umur_karyawan,
                'alamat_karyawan' => $request->alamat_karyawan,
                'nama_perusahaan' => $request->nama_perusahaan
            ]
        );

        return response()->json(
            $karyawan,
            200
        );
    }
}
