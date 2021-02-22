import { useEffect, useState } from "react"

import { ChartIdentifier } from "../interfaces/ChartType"
import { ReportData } from "../interfaces/ReportType"
import { ChartIndex, AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import Chart from "./Chart"
import Dropdown from "./Dropdown"

import "../style/ReportChart.css"

type Props = {
  reportList: ReportData[]
  removeReportChart: (id: string) => void
  chartIdentifier: ChartIdentifier
  defaultChartIndex?: ChartIndex
}
type ChartDataType = [[string, keyof ReportData], ...[Date, number]]

const ReportChart = ({ reportList, removeReportChart, chartIdentifier, defaultChartIndex }: Props) => {
  const chartList = [
    ChartIndex.PERFORMANCE,
    ChartIndex.ACCESSIBILITY,
    ChartIndex.BEST_PRACTICE,
    ChartIndex.SEO,
    ChartIndex.PWA,
    ChartIndex.SPEED_INDEX,
    ChartIndex.TBT,
    ChartIndex.FCP,
    ChartIndex.TTI,
    ChartIndex.LCP,
    ChartIndex.CLS,
    ChartIndex.UJ,
    ChartIndex.SRT,
  ]

  const [chartData, setChartData] = useState<ChartDataType[]>([])
  const [analysisStartDate, setAnalysisStartDate] = useState(new Date())
  const [analysisType, setAnalysisType] = useState<keyof ReportData>(defaultChartIndex || ChartIndex.PERFORMANCE)

  const getSelectChartType = (e: any) => {
    setAnalysisType(e.target.value)
  }

  const parseChartData = () => {
    const chartDatas = reportList
      .map((report) => [new Date(report.fetchTime), report[analysisType]])
      .filter((parsedReport) => parsedReport[0] > analysisStartDate)
    const chartDateArray: any = [["x", analysisType]]
    setChartData([...chartDateArray, ...chartDatas])
  }

  const handleDropdown = (e: any) => {
    const period = new Date()
    const analysisMap = {
      [String(AnalysisPeriod.DAY)]: AnalysisDate.DAY,
      [String(AnalysisPeriod.WEEK)]: AnalysisDate.WEEK,
      [String(AnalysisPeriod.HALF_MONTH)]: AnalysisDate.HALF_MONTH,
      [String(AnalysisPeriod.MONTH)]: AnalysisDate.MONTH,
    }
    period.setDate(period.getDate() - analysisMap[e.target.value])
    setAnalysisStartDate(period)
  }

  useEffect(() => {
    if (defaultChartIndex) {
      const period = new Date()
      period.setDate(period.getDate() - AnalysisDate.DAY)
      const chartDatas = reportList
        .map((report) => [new Date(report.fetchTime), report[analysisType]])
        .filter((parsedReport) => parsedReport[0] > period)
      const chartDateArray: any = [["x", analysisType]]
      setChartData([...chartDateArray, ...chartDatas])
    }
  }, [reportList])

  useEffect(() => {
    const timeStamp = new Date(chartIdentifier.timestamp)
    timeStamp.setDate(timeStamp.getDate() - AnalysisDate.DAY)
    setAnalysisStartDate(timeStamp)
  }, [chartIdentifier])

  return (
    <div className="chart-container">
      <div className="chart-submit">
        <Dropdown selectTypes={chartList} getSelectType={getSelectChartType} defaultSelect={defaultChartIndex} />
        <Dropdown
          selectTypes={[AnalysisPeriod.DAY, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={handleDropdown}
        />
        <button onClick={parseChartData}>제출</button>
        <button onClick={() => removeReportChart(chartIdentifier.id)}>차트 삭제</button>
      </div>
      <div className="chart">
        {chartData.length > 0 ? (
          <Chart
            data={chartData}
            vAxis={
              analysisType === ChartIndex.PERFORMANCE ||
              analysisType === ChartIndex.ACCESSIBILITY ||
              analysisType === ChartIndex.BEST_PRACTICE ||
              analysisType === ChartIndex.SEO ||
              analysisType === ChartIndex.PWA
                ? "score"
                : "milliseconds"
            }
          />
        ) : (
          <div className="none-chart">데이터를 선택해주세요</div>
        )}
      </div>
    </div>
  )
}

export default ReportChart
