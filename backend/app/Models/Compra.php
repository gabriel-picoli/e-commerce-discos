<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_comprador',
        'valor_total',
        'comprador_nome',
        'comprador_email',
        'comprador_telefone',
        'endereco_cep',
        'endereco_rua',
        'endereco_numero',
        'endereco_complemento',
        'endereco_bairro',
        'endereco_cidade',
        'endereco_estado',
        'pagamento_metodo',
        'pagamento_detalhes',
    ];

    /**
     * O usuário (comprador) que fez esta compra.
     */
    public function comprador()
    {
        return $this->belongsTo(User::class, 'id_comprador');
    }

    /**
     * Os anúncios (produtos) que fazem parte desta compra.
     * Este é o relacionamento N-para-N (Muitos-para-Muitos)
     */
    public function anuncios()
    {
        return $this->belongsToMany(Anuncio::class, 'compra_anuncio', 'id_compra', 'id_anuncio')
            ->withPivot('quantidade', 'preco_unitario', 'subtotal', 'id_vendedor') // Puxa os dados da tabela pivot
            ->withTimestamps();
    }
}
