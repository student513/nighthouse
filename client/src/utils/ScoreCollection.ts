import { ReportData } from "../interfaces/ReportType"

const pushScoreToCollection = (ReportList: ReportData[]) => {
  const scoreCollection = ReportList.reduce(
    (acc, cur) => {
      acc.performance ? acc.performance.push(cur.performance) : (acc.performance = [cur.performance])
      acc.accessibility ? acc.accessibility.push(cur.accessibility) : (acc.accessibility = [cur.accessibility])
      acc.bestPractices ? acc.bestPractices.push(cur.bestPractices) : (acc.bestPractices = [cur.bestPractices])
      acc.seo ? acc.seo.push(cur.seo) : (acc.seo = [cur.seo])
      acc.pwa ? acc.pwa.push(cur.pwa) : (acc.pwa = [cur.pwa])
      acc.speedIndex ? acc.speedIndex.push(cur.speedIndex) : (acc.speedIndex = [cur.speedIndex])
      acc.totalBlockingTime
        ? acc.totalBlockingTime.push(cur.totalBlockingTime)
        : (acc.totalBlockingTime = [cur.totalBlockingTime])
      acc.firstContentfulPaint
        ? acc.firstContentfulPaint.push(cur.firstContentfulPaint)
        : (acc.firstContentfulPaint = [cur.firstContentfulPaint])
      acc.timeToInteractive
        ? acc.timeToInteractive.push(cur.timeToInteractive)
        : (acc.timeToInteractive = [cur.timeToInteractive])
      acc.largestContentfulPaint
        ? acc.largestContentfulPaint.push(cur.largestContentfulPaint)
        : (acc.largestContentfulPaint = [cur.largestContentfulPaint])
      acc.cumulativeLayoutShift
        ? acc.cumulativeLayoutShift.push(cur.cumulativeLayoutShift)
        : (acc.cumulativeLayoutShift = [cur.cumulativeLayoutShift])
      acc.unminifiedJavascript
        ? acc.unminifiedJavascript.push(cur.unminifiedJavascript)
        : (acc.unminifiedJavascript = [cur.unminifiedJavascript])
      acc.serverResponseTime
        ? acc.serverResponseTime.push(cur.serverResponseTime)
        : (acc.serverResponseTime = [cur.serverResponseTime])

      return acc
    },
    {
      performance: [] as number[],
      accessibility: [] as number[],
      bestPractices: [] as number[],
      seo: [] as number[],
      pwa: [] as number[],
      speedIndex: [] as number[],
      totalBlockingTime: [] as number[],
      firstContentfulPaint: [] as number[],
      timeToInteractive: [] as number[],
      largestContentfulPaint: [] as number[],
      cumulativeLayoutShift: [] as number[],
      unminifiedJavascript: [] as number[],
      serverResponseTime: [] as number[],
    }
  )
  return scoreCollection
}

export { pushScoreToCollection }
