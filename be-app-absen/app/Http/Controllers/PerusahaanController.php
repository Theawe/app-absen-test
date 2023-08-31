<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostPerusahaanRequest;
use App\Models\Perusahaan;

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
}
