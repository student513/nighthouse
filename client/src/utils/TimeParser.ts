const addZeroUnderTen = (time: Date) => {
  const parsedMonth = time.getMonth() < 9 ? `0${time.getMonth() + 1}` : `${time.getMonth()}`
  const parsedDate = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`
  const parsedHours = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`
  const parsedMinutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`
  return { parsedMonth, parsedDate, parsedHours, parsedMinutes }
}

const reportDateParser = (stringTime: string) => {
  const time = new Date(stringTime)
  const { parsedMonth, parsedDate, parsedHours } = addZeroUnderTen(time)
  return `${time.getFullYear()}년 ${parsedMonth}월 ${parsedDate}일 ${parsedHours}시`
}

const cardDateParser = (stringTime: string) => {
  const time = new Date(stringTime)
  const { parsedMonth, parsedDate, parsedHours, parsedMinutes } = addZeroUnderTen(time)
  return `${time.getFullYear()}.${parsedMonth}.${parsedDate} ${parsedHours}:${parsedMinutes}`
}

export { reportDateParser, cardDateParser }
