import { useState, useCallback } from "react"

import { AnalysisPeriod, AnalysisDate } from "../../constants/ChartIndex"

export const useSelectDate = (initialState: any) => {
  const [analysisStartDate, setAnalysisStartDate] = useState<any>(initialState)

  const handleDropdown = useCallback(
    (e: any) => {
      const period = new Date()
      const analysisMap = {
        [String(AnalysisPeriod.WEEK)]: AnalysisDate.WEEK,
        [String(AnalysisPeriod.HALF_MONTH)]: AnalysisDate.HALF_MONTH,
        [String(AnalysisPeriod.MONTH)]: AnalysisDate.MONTH,
      }
      period.setDate(period.getDate() - analysisMap[e.target.value])
      setAnalysisStartDate(period)
    },
    [analysisStartDate]
  )

  return [analysisStartDate, handleDropdown]
}
