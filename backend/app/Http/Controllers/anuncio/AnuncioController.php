<?php

namespace App\Http\Controllers\anuncio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Anuncio;

class AnuncioController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'id_user' => 'required|exists:users,id',
            'id_produto' => 'required|exists:produtos,id',
        ]);

        // Criar anúncio
        Anuncio::create($request->all());
    }

    public function show($id)
    {
        $anuncio = Anuncio::with(['produto', 'user'])->find($id);

        if (!$anuncio) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }

        return response()->json($anuncio);
    }
}
