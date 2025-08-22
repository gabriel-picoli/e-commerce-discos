<?php

namespace App\Http\Controllers\produtos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produto;

class ProdutoController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'name' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'conservacao' => 'required|string|max:255',
            'genero' => 'required|string|max:255',
            'artista' => 'required|string|max:255',
            'quanti' => 'required|integer|min:0',
            'capa' => 'required|string', // pode ser uma URL ou caminho
            'lancamento' => 'required|string|max:255',
            'id_user' => 'required|exists:users,id',
        ]);

        // Criar o produto
        Produto::create($request->all());
    }

    public function show($id)
    {
        $produto = Produto::find($id);

        if (!$produto) {
            return response()->json(['message' => 'Produto não encontrado'], 404);
        }

        return response()->json($produto);
    }
}
