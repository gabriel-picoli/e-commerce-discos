<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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

    public function update(Request $request, $id)
    {
        // 1. Encontra o usuário pelo ID
        $user = User::find($id);

        // 2. Verifica se o usuário existe
        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        // 3. Valida os dados recebidos
        // 'sometimes' significa que só valida se o campo estiver presente no request
        // 'unique:users,email,' . $id garante que o email seja único, ignorando o do próprio usuário
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8', // O Model já fará o hash automático (via 'casts')
            'cpf' => 'sometimes|nullable|string|max:14',
            'cnpj' => 'sometimes|nullable|string|max:18',
            'vendedor' => 'sometimes|boolean',
            'telefone' => 'sometimes|nullable|string|max:20',
            'cep' => 'sometimes|nullable|string|max:10',
            'endereco' => 'sometimes|nullable|string|max:255',
            'cidade' => 'sometimes|nullable|string|max:255',
            'estado' => 'sometimes|nullable|string|max:2',
        ]);

        // 4. Atualiza o usuário com os dados validados
        // Isso funciona perfeitamente porque você definiu o $fillable no seu Model
        $user->update($validatedData);

        // 5. Retorna o usuário atualizado
        return response()->json($user);
    }
}
