const ReportDateParser = (time: string) => {
  const Time = new Date(time)
  return `${Time.getFullYear()}년 ${Time.getMonth()}월 ${Time.getDate()}일 ${Time.getHours()}시`
}

const CardDateParser = (time: string) => {
  const Time = new Date(time)
  const parsedMonth = Time.getMonth() < 10 ? `0${Time.getMonth()}` : `${Time.getMonth()}`
  const parsedDate = Time.getDate() < 10 ? `0${Time.getDate()}` : `${Time.getDate()}`
  const parsedHours = Time.getHours() < 10 ? `0 ${Time.getHours()}` : `${Time.getHours()}`
  const parsedMinutes = Time.getMinutes() < 10 ? `0${Time.getMinutes()}` : `${Time.getMinutes()}`

  return `${Time.getFullYear()}.${parsedMonth}.${parsedDate} ${parsedHours}:${parsedMinutes}`
}

export { ReportDateParser, CardDateParser }
