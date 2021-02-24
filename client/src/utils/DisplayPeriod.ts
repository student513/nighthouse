import { AnalysisDate } from "../constants/ChartIndex"

export const setDefaultPeriod = (period: AnalysisDate) => {
  const timestamp = new Date()
  timestamp.setDate(timestamp.getDate() - period)
  return timestamp
}
