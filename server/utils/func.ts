export const exportProfileId = (filename) => {
  const idAndExtension = filename.split("-")
  const id = idAndExtension[1].split(".")
  return id[0]
}

export const getMedianValue = (reportBuffer: any) => {
  if (reportBuffer.length === 0) return
  const keyList = Object.keys(reportBuffer[0])
  const keyCollection = {}
  reportBuffer.forEach((report) => {
    keyList.forEach((key) => {
      keyCollection[key] ? keyCollection[key].push(report[key]) : (keyCollection[key] = [report[key]])
    })
  })

  const medianCollection = {}
  keyList.forEach((key) => {
    medianCollection[key] = keyCollection[key].sort((first, second) => first - second)[
      Math.ceil(keyCollection[key].length / 2)
    ]
  })
  console.log(medianCollection)
  return medianCollection
}
