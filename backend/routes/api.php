<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\register\RegisterController;
use App\Http\Controllers\produtos\ProdutoController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//login----------------------------------------------------------------------------------
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/criarProduto', [ProdutoController::class, 'store']);
    Route::post('/criarAnuncio', [ProdutoController::class, 'store']);
});
