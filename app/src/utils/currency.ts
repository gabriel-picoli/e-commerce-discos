export const parseCurrency = (value: string): number => {
  if (!value) return 0

  const cleaned = value.replace(/[\$,\s]/g, '').replace(',', '')

  const number = parseFloat(cleaned)

  return isNaN(number) ? 0 : number
}

export const formatCurrency = (value?: number): string => {
  return (value ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
