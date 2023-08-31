<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostKaryawanRequest;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class KaryawanController extends BaseController
{
    public function index()
    {
        $value = Cache::remember('karyawan', now()->addMinutes(5), function () {
            $karyawan = Karyawan::orderBy('created_at', 'ASC')->get();
            return $karyawan;
        });

        return $this->sendResponse($value, 'Karyawans Retrieved Successfully.');
    }

    public function store(PostKaryawanRequest $request): mixed
    {
        $karyawan =  Karyawan::create(
            [
                'nama_karyawan' => $request->nama_karyawan,
                'umur_karyawan' => $request->umur_karyawan,
                'alamat_karyawan' => $request->alamat_karyawan,
                'nama_perusahaan' => $request->nama_perusahaan
            ]
        );

        return $this->sendResponse($karyawan, 'Berhasil Membuat Karyawan', 201);
    }

    public function absen(Request $request): mixed
    {
        $id = $request->id;

        $karyawan = Karyawan::find($id);
        if ($karyawan == null) {
            return $this->sendError("Error Id tidak ditemukan");
        }

        if (Cache::has($id)) {
            return $this->sendError("Karyawan tersebut sudah absen", [], 400);
        }

        $dataAbsen = [
            "id" => $karyawan->_id,
            "nama" => $karyawan->nama_karyawan,
            "date" => date("Y-m-d H:i:s")
        ];

        Cache::set($id, $dataAbsen, now()->addHours(8)); //ubah waktu untuk kapan cache akan dihapus
        return $this->sendResponse(Cache::get($id), "Success Absen");
    }

    public function listAbsen(): mixed
    {
        $listIdUser = Karyawan::pluck('_id');
        $listAbsen = array();
        foreach ($listIdUser as $id) {

            $karyawan = Cache::get($id);
            if ($karyawan != null) {
                array_push($listAbsen, $karyawan);
            }
        }

        return $this->sendResponse($listAbsen, 'List Absen.');
    }
}
