<?php

// 1. Namespace atualizado para a pasta 'checkout'
namespace App\Http\Controllers\checkout;

// 2. Importamos o Controller base
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Anuncio;
use App\Models\Produto;
// 3. O modelo permanece 'Compra', como você pediu
use App\Models\Compra;
use App\Models\User;
use Exception;

// 4. O nome da classe muda
class CheckoutController extends Controller
{
    /**
     * Processa o checkout de um carrinho de compras.
     */
    public function checkout(Request $request)
    {
        $user = Auth::user();

        // A validação é idêntica
        $validator = Validator::make($request->all(), [
            'cart' => 'required|array|min:1',
            'cart.*.anuncio_id' => 'required|exists:anuncio,id',
            'cart.*.quantidade' => 'required|integer|min:1',
            'endereco' => 'required|array',
            'endereco.cep' => 'required|string',
            'endereco.rua' => 'required|string',
            'endereco.numero' => 'required|string',
            'endereco.complemento' => 'nullable|string',
            'endereco.bairro' => 'required|string',
            'endereco.cidade' => 'required|string',
            'endereco.estado' => 'required|string|max:2',
            'pagamento' => 'required|array',
            'pagamento.metodo' => 'required|string',
            'pagamento.detalhes' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Erro de validação', 'errors' => $validator->errors()], 422);
        }

        $cartItens = $request->cart;
        $endereco = $request->endereco;
        $pagamento = $request->pagamento;

        try {
            // 5. A transação continua usando o modelo 'Compra'
            $compra = DB::transaction(function () use ($user, $cartItens, $endereco, $pagamento) {

                $valorTotal = 0;
                $itensParaAnexar = [];

                $anuncioIds = collect($cartItens)->pluck('anuncio_id');
                $anuncios = Anuncio::with('produto')->whereIn('id', $anuncioIds)->get();

                foreach ($cartItens as $item) {
                    $anuncio = $anuncios->find($item['anuncio_id']);
                    $produto = $anuncio->produto;

                    $produtoLocked = Produto::where('id', $produto->id)->lockForUpdate()->first();

                    if ($produtoLocked->quanti < $item['quantidade']) {
                        throw new Exception("Estoque insuficiente para o produto: {$produto->name}");
                    }

                    $subTotal = $anuncio->preco * $item['quantidade'];
                    $valorTotal += $subTotal;

                    $itensParaAnexar[$anuncio->id] = [
                        'quantidade' => $item['quantidade'],
                        'preco_unitario' => $anuncio->preco,
                        'subtotal' => $subTotal,
                        'id_vendedor' => $anuncio->id_user,
                    ];
                }

                // 6. Continua criando uma 'Compra'
                $compra = Compra::create([
                    'id_comprador' => $user->id,
                    'valor_total' => $valorTotal,
                    'comprador_nome' => $user->name,
                    'comprador_email' => $user->email,
                    'comprador_telefone' => $user->telefone,
                    'endereco_cep' => $endereco['cep'],
                    'endereco_rua' => $endereco['rua'],
                    'endereco_numero' => $endereco['numero'],
                    'endereco_complemento' => $endereco['complemento'] ?? null,
                    'endereco_bairro' => $endereco['bairro'],
                    'endereco_cidade' => $endereco['cidade'],
                    'endereco_estado' => $endereco['estado'],
                    'pagamento_metodo' => $pagamento['metodo'],
                    'pagamento_detalhes' => $pagamento['detalhes'] ?? null,
                ]);

                // 7. Continua usando o relacionamento 'anuncios()' do modelo 'Compra'
                $compra->anuncios()->attach($itensParaAnexar);

                // 8. Decrementa o estoque (lógica idêntica)
                foreach ($cartItens as $item) {
                    $anuncio = $anuncios->find($item['anuncio_id']);
                    Produto::where('id', $anuncio->id_produto)->decrement('quanti', $item['quantidade']);
                }

                return $compra;
            });

            // 9. Retorna o objeto 'compra'
            $compra->load('anuncios');

            return response()->json([
                'message' => 'Compra realizada com sucesso!', // A mensagem pode ser 'Compra' ou 'Pedido'
                'compra' => $compra
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao processar a compra: ' . $e->getMessage()
            ], 422);
        }
    }
}
