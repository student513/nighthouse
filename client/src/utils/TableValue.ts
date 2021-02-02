const getMax = (numArray: number[]) => {
  return Math.max(...numArray)
}
const getMin = (numArray: number[]) => {
  return Math.min(...numArray)
}
export const getRepresentativeValues = (parsedList: number[], valueName: string) => {
  const len = parsedList.length
  // 1보다 크면 반올림
  const rawMean = parsedList.reduce((acc, cur) => acc + cur) / len
  const rawMedian = parsedList.sort((first, second) => first - second)[Math.ceil(len / 2)]
  const rawMax = getMax(parsedList)
  const rawMin = getMin(parsedList)

  const mean = rawMean >= 1 ? Math.round(rawMean) : rawMean.toFixed(2)
  const median = rawMedian >= 1 ? Math.round(rawMedian) : rawMedian.toFixed(2)
  const max = rawMax >= 1 ? Math.round(rawMax) : rawMax.toFixed(2)
  const min = rawMin >= 1 ? Math.round(rawMin) : rawMin.toFixed(2)
  return {
    valueName,
    mean,
    median,
    max,
    min,
  }
}
