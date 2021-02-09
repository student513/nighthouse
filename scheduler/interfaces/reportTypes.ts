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
