<?php

use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\PerusahaanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::get('karyawan', [KaryawanController::class, "index"]);
    Route::post('karyawan', [KaryawanController::class, "store"]);
    Route::post('karyawan/{id}', [KaryawanController::class, "absen"]);
    Route::get('karyawan/list-absen', [KaryawanController::class, "listAbsen"]);
    Route::get('karyawan/flush', [KaryawanController::class, "flush"]);

    Route::get('perusahaan', [PerusahaanController::class, "index"]);
    Route::post('perusahaan', [PerusahaanController::class, "store"]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
