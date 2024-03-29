import { useState } from "react"
import { useEffectOnce } from "react-use"
import MultiSelect from "react-multi-select-component"

import { ReportData } from "../interfaces/ReportType"
import { ChartDataType } from "../interfaces/ChartType"
import { ChartIndex, ChartLable, AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import { setDefaultPeriod } from "../utils/DisplayPeriod"
import { useSelectDate } from "../utils/customHook/useSelectDate"
import Chart from "./Chart"
import Dropdown from "./Dropdown"
import { Warning } from "../constants/Warning"

import "../style/MultiChart.css"

type Props = {
  reportList: ReportData[]
}

type AnalysisType = { label: string; value: keyof ReportData }

const MultiChart = ({ reportList }: Props) => {
  const chartList = [
    { label: ChartLable.PERFORMANCE, value: ChartIndex.PERFORMANCE },
    { label: ChartLable.ACCESSIBILITY, value: ChartIndex.ACCESSIBILITY },
    { label: ChartLable.BEST_PRACTICE, value: ChartIndex.BEST_PRACTICE },
    { label: ChartLable.SEO, value: ChartIndex.SEO },
    { label: ChartLable.PWA, value: ChartIndex.PWA },
    { label: ChartLable.SPEED_INDEX, value: ChartIndex.SPEED_INDEX },
    { label: ChartLable.TBT, value: ChartIndex.TBT },
    { label: ChartLable.FCP, value: ChartIndex.FCP },
    { label: ChartLable.TTI, value: ChartIndex.TTI },
    { label: ChartLable.LCP, value: ChartIndex.LCP },
    { label: ChartLable.CLS, value: ChartIndex.CLS },
    { label: ChartLable.UJ, value: ChartIndex.UJ },
    { label: ChartLable.SRT, value: ChartIndex.SRT },
  ]

  const [chartData, setChartData] = useState<ChartDataType[]>([])
  const { analysisStartDate, setAnalysisStartDate, handleDropdown } = useSelectDate(new Date())
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([
    { label: ChartLable.SPEED_INDEX, value: ChartIndex.SPEED_INDEX },
    { label: ChartLable.TBT, value: ChartIndex.TBT },
    { label: ChartLable.FCP, value: ChartIndex.FCP },
  ])

  const parseChartData = () => {
    if (analysisTypes.length === 0) {
      return alert(Warning.SELECT_SCORE)
    }
    const analysisValues = analysisTypes.map((analysisType) => analysisType.value)
    const chartDatas = reportList
      .map((report) => {
        const scores = analysisValues.reduce((acc, analysisValue) => {
          return [...acc, report[analysisValue]]
        }, [] as (string | number)[])
        return [new Date(report.fetchTime), ...scores]
      })
      .filter((parsedReport) => parsedReport[0] > analysisStartDate)
    const chartDateArray: [string, ...string[]][] = [["x", ...analysisValues]]
    setChartData([...chartDateArray, ...chartDatas])
  }

  useEffectOnce(() => {
    const timestamp = setDefaultPeriod(AnalysisDate.DAY)
    setAnalysisStartDate(timestamp)

    const analysisValues = analysisTypes.map((analysisType) => analysisType.value)
    const chartDatas = reportList
      .map((report) => {
        const scores = analysisValues.reduce((acc, analysisValue) => {
          return [...acc, report[analysisValue]]
        }, [] as (string | number)[])
        return [new Date(report.fetchTime), ...scores]
      })
      .filter((parsedReport) => parsedReport[0] > timestamp)
    const chartDateArray: [string, ...string[]][] = [["x", ...analysisValues]]
    setChartData([...chartDateArray, ...chartDatas])
  })

  return (
    <>
      <MultiSelect options={chartList} labelledBy={"Select"} onChange={setAnalysisTypes} value={analysisTypes} />
      <div className="multi-chart-submit">
        <Dropdown
          selectTypes={[AnalysisPeriod.DAY, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={handleDropdown}
        />
        <button onClick={parseChartData}>제출</button>
      </div>
      <Chart data={chartData} chartType="LineChart" />
    </>
  )
}

export default MultiChart
