import { useState } from "react"

import { ReportData } from "../interfaces/ReportType"
import { ChartIndex, AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import Chart from "./Chart"
import Dropdown from "./Dropdown"
import { ReportErrorMessage } from "../constants/error"

import "../style/ReportChart.css"

type Props = {
  reportList: ReportData[]
  removeReportChart: (chartId: string) => void
  chartId: string
}

const ReportChart = ({ reportList, removeReportChart, chartId }: Props) => {
  const chartList = [
    ChartIndex.SPEED_INDEX,
    ChartIndex.TBT,
    ChartIndex.FCP,
    ChartIndex.TTI,
    ChartIndex.LCP,
    ChartIndex.CLS,
    ChartIndex.UJ,
    ChartIndex.SRT,
    ChartIndex.PERFORMANCE,
    ChartIndex.ACCESSIBILITY,
    ChartIndex.BEST_PRACTICE,
    ChartIndex.SEO,
  ]

  const [chartData, setChartData] = useState<(string | number | Date)[][]>([]) // 타입을 어떻게 줘야할지 모르겠음
  const [analysisStartDate, setAnalysisStartDate] = useState<Date>(new Date())
  const [analysisType, setAnalysisType] = useState<keyof ReportData>(ChartIndex.SPEED_INDEX)
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>(AnalysisPeriod.NONE)

  const getSelectChartType = (e: any) => {
    setAnalysisType(e.target.value)
  }

  const getSelectDateType = (e: any) => {
    const period = new Date()
    if (e.target.value === AnalysisPeriod.WEEK) {
      period.setDate(period.getDate() - AnalysisDate.WEEK)
    } else if (e.target.value === AnalysisPeriod.HALF_MONTH) {
      period.setDate(period.getDate() - AnalysisDate.HALF_MONTH)
    } else {
      period.setDate(period.getDate() - AnalysisDate.MONTH)
    }
    setSelectedPeriod(e.target.value) //예외 체크
    setAnalysisStartDate(period) //실제 계산에 사용될 날짜값
  }

  const parseChartData = () => {
    if (selectedPeriod === AnalysisPeriod.NONE) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const chartDataArray = reportList
      .map((report) => {
        if (
          analysisType === ChartIndex.SPEED_INDEX ||
          analysisType === ChartIndex.TBT ||
          analysisType === ChartIndex.FCP ||
          analysisType === ChartIndex.TTI ||
          analysisType === ChartIndex.LCP ||
          analysisType === ChartIndex.CLS ||
          analysisType === ChartIndex.UJ ||
          analysisType === ChartIndex.SRT
        )
          return [new Date(report.fetchTime), report[analysisType].numericValue]
        else return [new Date(report.fetchTime), report[analysisType]]
      })
      .filter((parsedReport) => parsedReport[0] > analysisStartDate)
    chartDataArray.unshift(["x", analysisType])
    setChartData(chartDataArray)
  }

  return (
    <div className="ChartContainer">
      <div className="ChartSubmit">
        <Dropdown selectTypes={chartList} getSelectType={getSelectChartType} />
        <Dropdown
          selectTypes={[AnalysisPeriod.NONE, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={getSelectDateType}
        />
        <button onClick={parseChartData}>제출</button>
        <button onClick={() => removeReportChart(chartId)}>차트 삭제</button>
      </div>
      <div className="Chart">
        {chartData.length > 0 ? (
          <Chart
            data={chartData}
            vAxis={
              analysisType === ChartIndex.PERFORMANCE ||
              analysisType === ChartIndex.ACCESSIBILITY ||
              analysisType === ChartIndex.BEST_PRACTICE ||
              analysisType === ChartIndex.SEO
                ? "score"
                : "milliseconds"
            }
          />
        ) : (
          <div className="NoneChart">데이터를 선택해주세요</div>
        )}
      </div>
    </div>
  )
}

export default ReportChart
