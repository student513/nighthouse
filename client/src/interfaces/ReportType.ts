export interface ScoreData {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  numericValue: number
  numericUnit: string
  displayValue: string
  details?: object
}

export interface ReportData {
  _id: string
  profileId: string
  requestedUrl: string
  finalUrl: string
  fetchTime: string
  speedIndex: number
  totalBlockingTime: number
  firstContentfulPaint: number
  timeToInteractive: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  unminifiedJavascript: number
  serverResponseTime: number
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  createdAt: string
  updatedAt: string
  reportCode: string
}

export interface RepresentationValue {
  valueName: string
  mean: number | string
  median: number | string
  max: number | string
  min: number | string
}
