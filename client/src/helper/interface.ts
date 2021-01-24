export interface UrlPayload {
  name: string;
  url: string;
}

export interface AnalysisTargetUrl {
  _id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreData {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: string;
  numericValue: number;
  numericUnit: string;
  displayValue: string;
  details?: object;
}

export interface ReportData {
  _id: string;
  profileId: string;
  requestedUrl: string;
  finalUrl: string;
  speedIndex: ScoreData;
  totalBlockingTime: ScoreData;
  firstContentfulPaint: ScoreData;
  timeToInteractive: ScoreData;
  largeContentfulPaint: ScoreData;
  cumulativeLayoutShift: ScoreData;
  unminifiedJavascript: ScoreData;
  serverResponseTime: ScoreData;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  createdAt: string;
  updatedAt: string;
}
