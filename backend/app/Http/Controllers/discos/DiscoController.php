<?php

namespace App\Http\Controllers\discos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

class DiscoController extends Controller
{
    public function criarAnuncio(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'string|required',
            'email' => 'required|email',
            'password' => 'required',
            'cpf' => 'nullable|string',
            'cnpj' => 'nullable|string',
            'vendedor' => 'string',
            'telefone' => 'nullable|string',
            'cep' => 'nullable|string',
            'endereco' => 'nullable|string',
            'cidade' => 'nullable|string',
            'estado' => 'nullable|string'
        ]);

        if (User::query()->where('email', $credentials['email'])->exists()) {
            return response()->json([
                'error' => 'usuario ja existe',

            ], 422);
        }

        $credentials['password'] = bcrypt($credentials['password']);
        $credentials['token'] = Str::uuid();
        $user = User::query()->create($credentials);

        $user->save();

        return $user;
    }
}
