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
  speedIndex: ScoreData
  totalBlockingTime: ScoreData
  firstContentfulPaint: ScoreData
  timeToInteractive: ScoreData
  largestContentfulPaint: ScoreData
  cumulativeLayoutShift: ScoreData
  unminifiedJavascript: ScoreData
  serverResponseTime: ScoreData
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  createdAt: string
  updatedAt: string
}

export interface RepresentationValue {
  valueName: string
  mean: number | string
  median: number | string
  max: number | string
  min: number | string
}
