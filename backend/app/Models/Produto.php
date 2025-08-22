<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos';

    protected $fillable = [
        'name',
        'tipo',
        'conservacao',
        'genero',
        'artista',
        'quanti',
        'capa',
        'lancamento',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'id_user');
    }
}
