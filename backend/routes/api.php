<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\register\RegisterController;
use App\Http\Controllers\produtos\ProdutoController;
use App\Http\Controllers\anuncio\AnuncioController;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//login----------------------------------------------------------------------------------
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {

    //criação de produtos e anuncios
    Route::post('/criarProduto', [ProdutoController::class, 'store']);
    Route::post('/criarAnuncio', [AnuncioController::class, 'store']);

    //getters de produtos e anuncios   
    Route::get('/users/{id}/produtos', [UserController::class, 'produtos']); //pegar todos produtos do usuario especifico
    Route::get('/users/{id}/anuncios', [UserController::class, 'anuncios']); //pegar todos anuncios do usuario especifico

    Route::get('/produtos/{id}', [ProdutoController::class, 'show'])->name('produtos.show'); //pegar produto especifico
    Route::get('/anuncios/{id}', [AnuncioController::class, 'show'])->name('anuncios.show'); // pegar anuncio especifico


});
