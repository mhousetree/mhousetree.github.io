export const getYearMonth = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}`
}

export const getYearMonthDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}
