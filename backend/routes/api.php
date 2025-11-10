<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\register\RegisterController;
use App\Http\Controllers\produtos\ProdutoController;
use App\Http\Controllers\anuncio\AnuncioController;
use App\Http\Controllers\UserController;

// TODAS as rotas que usam autenticação stateful devem usar o middleware 'web'
Route::middleware('web')->group(function () {
    
    // Rotas públicas
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [RegisterController::class, 'register']);
    
    // Rotas autenticadas
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        
        // Criação de produtos e anuncios
        Route::post('/criarProduto', [ProdutoController::class, 'store']);
        Route::post('/criarAnuncio', [AnuncioController::class, 'store']);

        // Getters de produtos e anuncios   
        Route::get('/produtos/getAll', [ProdutoController::class, 'showAll'])->name('produtos.showAll');
        Route::get('/anuncios/getAll', [AnuncioController::class, 'showAll'])->name('anuncios.showAll');
        
        Route::get('/users/{id}/produtos', [UserController::class, 'produtos']);
        Route::get('/users/{id}/anuncios', [UserController::class, 'anuncios']);

        Route::get('/produtos/{id}', [ProdutoController::class, 'show'])->name('produtos.show');
        Route::get('/anuncios/{id}', [AnuncioController::class, 'show'])->name('anuncios.show');

        //Editar produtos e anuncios
        Route::put('/produtos/{id}', [ProdutoController::class, 'edit'])->name('produtos.edit');
        Route::put('/anuncios/{id}', [AnuncioController::class, 'update'])->name('anuncios.edit');

        //Deletar produtos e anuncios
        Route::delete('/produtos/{id}', [ProdutoController::class, 'delete'])->name('produtos.delete');
        Route::delete('/anuncios/{id}', [AnuncioController::class, 'delete'])->name('anuncios.delete');
    });
});