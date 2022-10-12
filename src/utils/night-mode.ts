export const isNight = () => {
  const nowHour = new Date().getHours()

  return nowHour < 6 || nowHour > 17
}
