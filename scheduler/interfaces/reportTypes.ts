interface ScoreType {
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

interface AuditsType {
  "speed-index": ScoreType
  "total-blocking-time": ScoreType
  "first-contentful-paint": ScoreType
  interactive: ScoreType
  "largest-contentful-paint": ScoreType
  "cumulative-layout-shift": ScoreType
  "unminified-javascript": ScoreType
  "server-response-time": ScoreType
}

interface CategoryType {
  title: string
  description?: string
  manualDescription: string
  auditRefs: object[]
  id: string
  score: number
}

interface CategoriesType {
  performance: CategoryType
  accessibility: CategoryType
  "best-practices": CategoryType
  seo: CategoryType
  pwa: CategoryType
}

export interface ReportType {
  requestedUrl: string
  finalUrl: string
  fetchTime: string
  audits: AuditsType
  categories: CategoriesType
}

export interface ProfileType {
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
  pwa: number
}
