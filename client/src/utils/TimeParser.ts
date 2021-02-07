const TimeParser = (time: string) => {
  const Time = new Date(time)
  return `${Time.getFullYear()}년 ${Time.getMonth()}월 ${Time.getDate()}일 ${Time.getHours()}시`
}
export default TimeParser
