import { ProfileType } from "../interfaces/reportTypes"

export const exportProfileId = (filename) => {
  const idAndExtension = filename.split("-")
  const id = idAndExtension[1].split(".")
  return id[0]
}

export const getMedianValue = (reportBuffer: ProfileType[]): ProfileType => {
  const medianCollection: ProfileType = {
    requestedUrl: "",
    finalUrl: "",
    fetchTime: "",
    speedIndex: 0,
    totalBlockingTime: 0,
    firstContentfulPaint: 0,
    timeToInteractive: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    unminifiedJavascript: 0,
    serverResponseTime: 0,
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    pwa: 0,
  }
  if (reportBuffer.length === 0) return medianCollection
  const keyList = Object.keys(reportBuffer[0])
  const keyCollection = {}
  reportBuffer.forEach((report) => {
    keyList.forEach((key) => {
      keyCollection[key] ? keyCollection[key].push(report[key]) : (keyCollection[key] = [report[key]])
    })
  })

  keyList.forEach((key) => {
    medianCollection[key] = keyCollection[key].sort((first, second) => first - second)[
      Math.ceil(keyCollection[key].length / 2)
    ]
  })
  return medianCollection
}
