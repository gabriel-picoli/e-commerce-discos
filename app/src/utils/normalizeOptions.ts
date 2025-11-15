export const normalizeOptions = (arr: string[]) => {
  return [...new Set(arr.filter(Boolean))].sort()
}
