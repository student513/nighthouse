import { useState, useCallback } from "react"

import { AnalysisPeriod, AnalysisDate } from "../../constants/ChartIndex"

export const useSelectDate = (initialState: any) => {
  const [analysisStartDate, setAnalysisStartDate] = useState<any>(initialState)

  const handleDropdown = useCallback(
    (e: any) => {
      const period = new Date()
      if (e.target.value === AnalysisPeriod.WEEK) {
        period.setDate(period.getDate() - AnalysisDate.WEEK)
      } else if (e.target.value === AnalysisPeriod.HALF_MONTH) {
        period.setDate(period.getDate() - AnalysisDate.HALF_MONTH)
      } else if (e.target.value === AnalysisPeriod.MONTH) {
        period.setDate(period.getDate() - AnalysisDate.MONTH)
      }
      setAnalysisStartDate(period)
    },
    [analysisStartDate]
  )

  return [analysisStartDate, handleDropdown]
}
