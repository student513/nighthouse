export enum ChartIndex {
  SPEED_INDEX = "speedIndex",
  TBT = "totalBlockingTime",
  FCP = "firstContentfulPaint",
  TTI = "timeToInteractive",
  LCP = "largestContentfulPaint",
  CLS = "cumulativeLayoutShift",
  UJ = "unminifiedJavascript",
  SRT = "serverResponseTime",
  PERFORMANCE = "performance",
  ACCESSIBILITY = "accessibility",
  BEST_PRACTICE = "bestPractices",
  SEO = "seo",
  PWA = "pwa",
}

export enum AnalysisPeriod {
  DAY = "최근 24시간",
  WEEK = "최근 7일",
  HALF_MONTH = "최근 15일",
  MONTH = "최근 30일",
}

export enum AnalysisDate {
  DAY = 1,
  WEEK = 7,
  HALF_MONTH = 15,
  MONTH = 30,
}
