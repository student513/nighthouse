export enum ChartIndex {
  SPEED_INDEX = "speedIndex",
  TBT = "totalBlockingTime",
  FCP = "firstContentfulPaint",
  TTI = "timeToInteractive",
  LCP = "largeContentfulPaint",
  CLS = "cumulativeLayoutShift",
  UJ = "unminifiedJavascript",
  SRT = "serverResponseTime",
  PERFORMANCE = "performance",
  ACCESSIBILITY = "accessibility",
  BEST_PRACTICE = "bestPractice",
  SEO = "seo",
}

export enum AnalysisPeriod {
  NONE = "-",
  WEEK = "최근 7일",
  HALF_MONTH = "최근 15일",
  MONTH = "최근 30일",
}

export enum AnalysisDate {
  WEEK = 7,
  HALF_MONTH = 15,
  MONTH = 30,
}
