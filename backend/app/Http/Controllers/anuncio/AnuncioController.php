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
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'preco' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'id_produto' => 'required|exists:produtos,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

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

    public function showAll()
    {
        $anuncios = Anuncio::get();
        return response()->json($anuncios);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'id_produto' => 'required|exists:produtos,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        $anuncio = Anuncio::find($id);

        if (!$anuncio) {
            return response()->json([
                'message' => 'Anúncio não encontrado'
            ], 404);
        }

        $anuncio->update($validator->validated());

        return response()->json([
            'message' => 'Anúncio atualizado com sucesso',
            'anuncio' => $anuncio
        ], 200); 
    }

    public function delete($id)
    {
        $anuncio = Anuncio::find($id);

        if (!$anuncio) {
            return response()->json([
                'message' => 'Anúncio não encontrado'
            ], 404);
        }

        $anuncio->delete();

        return response()->json([
            'message' => 'Anúncio excluído com sucesso'
        ], 200); 
    }
}
