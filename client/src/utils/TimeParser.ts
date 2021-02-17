const reportDateParser = (time: string) => {
  const Time = new Date(time)
  const parsedMonth = Time.getMonth() < 10 ? `0${Time.getMonth() + 1}` : `${Time.getMonth()}`
  const parsedDate = Time.getDate() < 10 ? `0${Time.getDate()}` : `${Time.getDate()}`
  const parsedHours = Time.getHours() < 10 ? `0${Time.getHours()}` : `${Time.getHours()}`
  return `${Time.getFullYear()}년 ${parsedMonth}월 ${parsedDate}일 ${parsedHours}시`
}

const cardDateParser = (time: string) => {
  const Time = new Date(time)
  const parsedMonth = Time.getMonth() < 10 ? `0${Time.getMonth() + 1}` : `${Time.getMonth()}`
  const parsedDate = Time.getDate() < 10 ? `0${Time.getDate()}` : `${Time.getDate()}`
  const parsedHours = Time.getHours() < 10 ? `0${Time.getHours()}` : `${Time.getHours()}`
  const parsedMinutes = Time.getMinutes() < 10 ? `0${Time.getMinutes()}` : `${Time.getMinutes()}`

  return `${Time.getFullYear()}.${parsedMonth}.${parsedDate} ${parsedHours}:${parsedMinutes}`
}

export { reportDateParser, cardDateParser }
