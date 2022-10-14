export const getYearMonth = (date: string) => {
  const ISOString = new Date(date)
  return `${ISOString.getFullYear()}.${ISOString.getMonth() + 1}`
}
