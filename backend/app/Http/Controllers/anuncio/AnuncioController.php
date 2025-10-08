<?php

namespace App\Http\Controllers\anuncio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Anuncio;

class AnuncioController extends Controller
{
    public function store(Request $request)
    {
        // Cria o validador manualmente
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'id_produto' => 'required|exists:produtos,id',
        ]);

        // Caso falhe, retorna erros de validação
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        // Cria o anúncio com os dados validados
        $anuncio = Anuncio::create($validator->validated());

        return response()->json([
            'message' => 'Anúncio criado com sucesso',
            'anuncio' => $anuncio
        ], 201);
    }

    public function show($id)
    {
        $anuncio = Anuncio::with(['produto', 'user'])->find($id);

        if (!$anuncio) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }

        return response()->json($anuncio);
    }

    public function showAll(){
        $anuncios = Anuncio::get();
        return response()->json($anuncios);
    }
}
