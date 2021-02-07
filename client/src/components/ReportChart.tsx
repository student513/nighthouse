import { useState } from "react"

import { ReportData } from "../interfaces/ReportType"
import { ChartIndex, AnalysisPeriod } from "../constants/ChartIndex"
import Chart from "./Chart"
import Dropdown from "./Dropdown"
import { ReportErrorMessage } from "../constants/error"
import { useSelectDate } from "../utils/customHook/useSelectDate"

import "../style/ReportChart.css"

type Props = {
  reportList: ReportData[]
  removeReportChart: (chartId: string) => void
  chartId: string
}
type ChartDataType = [[string, keyof ReportData], ...[Date, number]]

const ReportChart = ({ reportList, removeReportChart, chartId }: Props) => {
  const chartList = [
    ChartIndex.PERFORMANCE,
    ChartIndex.ACCESSIBILITY,
    ChartIndex.BEST_PRACTICE,
    ChartIndex.SEO,
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
  const [analysisStartDate, setAnalysisStartDate] = useSelectDate(new Date()) //useState<Date>(new Date())
  const [analysisType, setAnalysisType] = useState<keyof ReportData>(ChartIndex.PERFORMANCE)

  const getSelectChartType = (e: any) => {
    setAnalysisType(e.target.value)
  }

  const parseChartData = () => {
    const chartDatas = reportList
      .map((report) => [new Date(report.fetchTime), report[analysisType]])
      .filter((parsedReport) => parsedReport[0] > analysisStartDate)

    if (chartDatas.length === 0) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const chartDateArray: any = [["x", analysisType]]
    setChartData([...chartDateArray, ...chartDatas])
  }

  return (
    <div className="ChartContainer">
      <div className="ChartSubmit">
        <Dropdown selectTypes={chartList} getSelectType={getSelectChartType} />
        <Dropdown
          selectTypes={[AnalysisPeriod.NONE, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={setAnalysisStartDate}
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
