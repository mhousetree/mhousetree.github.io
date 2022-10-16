export const getYearMonth = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}`
}
