export function parseCurrency(value: string): number {
  if (!value) return 0

  // limpa o valor para apenas numero
  const cleaned = value
    .replace(/[R$\s]/g, '') // remove R$ e os espaços
    .replace(/\./g, '') // remove separador de milhar
    .replace(',', '.') // troca virgula decimal por ponto

  const number = parseFloat(cleaned)

  return isNaN(number) ? 0 : number
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
