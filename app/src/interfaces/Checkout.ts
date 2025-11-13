export interface Checkout {
  cart: {
    anuncio_id: number
    quantidade: number
  }[]
  endereco: {
    cep: string
    rua: string
    numero: string
    complemento?: string
    bairro?: string
    cidade: string
    estado: string
  }
  pagamento: {
    metodo: 'credit' | 'debit' | 'pix' | 'boleto'
    detalhes?: {
      cardNumber: string
      cardName: string
      cardExpiry: string
      cardCvv: string
    }
  }
}
