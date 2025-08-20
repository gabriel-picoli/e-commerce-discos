<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Criar tabela 'anuncio'
        Schema::create('anuncio', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('tipo');
            $table->string('titulo');
            $table->string('descricao');
            $table->decimal('preco', 10, 2);
            $table->unsignedBigInteger('id_user');
            $table->string('conservacao');
            $table->string('genero');
            $table->string('artista');
            $table->integer('quanti');
            $table->text('capa');
            $table->string('lancamento');

            // Foreign key para users(id)
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });

        // Alterar tabela 'users'
        Schema::table('users', function (Blueprint $table) {
            $table->char('cpf', 11)->nullable();
            $table->char('cnpj', 14)->nullable();
            $table->string('telefone')->nullable();
            $table->string('cep')->nullable();
            $table->string('endereco')->nullable();
            $table->string('cidade')->nullable();
            $table->string('estado')->nullable();
        });
    }

    public function down(): void
    {
        // Remover colunas adicionadas em users
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cpf', 'cnpj', 'telefone', 'cep', 'endereco', 'cidade', 'estado']);
        });

        // Apagar tabela anuncio
        Schema::dropIfExists('anuncio');
    }
};
