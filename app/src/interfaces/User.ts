export interface User {
  id?: number
  name: string
  email: string
  password?: string
  vendedor: string
  telefone?: string | null
  cep?: string | null
  endereco?: string | null
  cidade?: string | null
  estado?: string | null
  cpf?: string | null
  cnpj?: string | null
}
