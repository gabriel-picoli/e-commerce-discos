<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function produtos($id)
    {
        $user = User::with('produtos')->find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        return response()->json($user->produtos);
    }

    public function anuncios($id)
    {
        $user = User::with('anuncios.produto')->find($id); // Inclui o produto no anúncio

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        return response()->json($user->anuncios);
    }
}
