export const isNight = () => {
  const nowHour = new Date().getHours()

  console.log(nowHour)

  return nowHour < 6 || nowHour > 17
}
