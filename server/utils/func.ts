export const exportProfileId = (filename) => {
  const idAndExtension = filename.split("-")
  const id = idAndExtension[1].split(".")
  return id[0]
}

export const getMedianValue = (reportBuffer: any) => {
  if (reportBuffer.length === 0) return
  const keyList = Object.keys(reportBuffer[0])
  const keyCollection = {
    requestedUrl: [],
    finalUrl: [],
    fetchTime: [],
    speedIndex: [],
    totalBlockingTime: [],
    firstContentfulPaint: [],
    timeToInteractive: [],
    largestContentfulPaint: [],
    cumulativeLayoutShift: [],
    unminifiedJavascript: [],
    serverResponseTime: [],
    performance: [],
    accessibility: [],
    bestPractices: [],
    seo: [],
  }
  reportBuffer.forEach((report) => {
    keyList.forEach((key) => {
      keyCollection[key].push(report[key])
    })
  })

  const medianCollection = {
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
  }

  keyList.forEach((key) => {
    medianCollection[key] = keyCollection[key].sort((first, second) => first - second)[
      Math.ceil(keyCollection[key].length / 2)
    ]
  })
  return medianCollection
}
