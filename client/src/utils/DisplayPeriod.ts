import { AnalysisDate } from "../constants/ChartIndex"

export const defaultPeriodOneDay = () => {
  const timestamp = new Date()
  timestamp.setDate(timestamp.getDate() - AnalysisDate.DAY)
  return timestamp
}
