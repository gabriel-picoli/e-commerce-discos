export const parseCurrency = (value: string): number => {
  if (!value) return 0

  // remove $ e espaços
  const cleaned = value.replace(/[\$\s]/g, '')

  // remove virgulas de milhar: "1,200.50" -> "1200.50"
  const noThousands = cleaned.replace(/,/g, '')

  return parseFloat(noThousands) || 0
}

export const formatCurrency = (value?: number): string => {
  return (value ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
