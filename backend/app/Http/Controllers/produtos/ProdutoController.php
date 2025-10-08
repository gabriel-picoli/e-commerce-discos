<?php

namespace App\Http\Controllers\produtos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Produto;

class ProdutoController extends Controller
{
    public function store(Request $request)
    {
        // Cria o validador manualmente
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'conservacao' => 'required|string|max:255',
            'genero' => 'required|string|max:255',
            'artista' => 'required|string|max:255',
            'quanti' => 'required|integer|min:0',
            'capa' => 'required|string',
            'lancamento' => 'required|string|max:255',
            'id_user' => 'required|exists:users,id',
        ]);

        // Se falhar, retorna os erros
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors()
            ], 422);
        }

        // Cria o produto com os dados validados
        $produto = Produto::create($validator->validated());

        return response()->json([
            'message' => 'Produto criado com sucesso',
            'produto' => $produto
        ], 201);
    }

    public function show($id)
    {
        $produto = Produto::find($id);

        if (!$produto) {
            return response()->json(['message' => 'Produto não encontrado'], 404);
        }

        return response()->json($produto);
    }

    public function showAll(){
        $produtos = Produto::get();
        return response()->json($produtos);
    }
}
