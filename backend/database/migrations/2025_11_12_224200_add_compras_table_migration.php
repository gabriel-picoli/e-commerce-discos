<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id();

            // --- Chaves ---
            $table->foreignId('id_comprador')->constrained('users');

            // --- Valores ---
            $table->decimal('valor_total', 10, 2);

            // --- Snapshot do Comprador ---
            $table->string('comprador_nome');
            $table->string('comprador_email');
            $table->string('comprador_telefone')->nullable();

            // --- Snapshot do Endereço de Entrega ---
            $table->string('endereco_cep');
            $table->string('endereco_rua');
            $table->string('endereco_numero');
            $table->string('endereco_complemento')->nullable();
            $table->string('endereco_bairro');
            $table->string('endereco_cidade');
            $table->string('endereco_estado', 2);

            // --- Snapshot do Pagamento ---
            $table->string('pagamento_metodo'); // 'cartao', 'pix', 'boleto'
            $table->json('pagamento_detalhes')->nullable(); // Ex: { "ultimos_digitos": "1234" }

            $table->timestamps(); // data da compra
        });

        Schema::create('compra_anuncio', function (Blueprint $table) {
            $table->id();

            // Chaves
            $table->foreignId('id_compra')->constrained('compras')->onDelete('cascade');
            $table->foreignId('id_anuncio')->constrained('anuncio')->onDelete('cascade');

            // Guarda quem vendeu este item específico
            $table->foreignId('id_vendedor')->constrained('users');

            // Snapshot do Item
            $table->integer('quantidade');
            $table->decimal('preco_unitario', 10, 2); // Preço no momento da compra
            $table->decimal('subtotal', 10, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compra_anuncio');
        Schema::dropIfExists('compras');
    }
};
