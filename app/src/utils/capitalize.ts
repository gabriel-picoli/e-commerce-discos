export const capitalize = (text: string): string => {
  if (!text) return ''

  return text
    .trim()
    .split(/\s+/) // separa por espaços multiplos
    .map((word) =>
      word
        .split('-') // suporta nomes com hifen
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('-')
    )
    .join(' ')
}
