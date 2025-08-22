<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
    use HasFactory;

    protected $table = 'anuncio';

    protected $fillable = [
        'titulo',
        'descricao',
        'preco',
        'id_user',
        'id_produto',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'id_user');
    }

    public function produto()
    {
        return $this->belongsTo(\App\Models\Produto::class, 'id_produto');
    }
}
