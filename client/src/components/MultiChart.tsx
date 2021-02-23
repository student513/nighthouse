import { useEffect, useState } from "react"
import MultiSelect from "react-multi-select-component"

import { ReportData } from "../interfaces/ReportType"
import { ChartIndex, ChartLable, AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import Chart from "./Chart"
import Dropdown from "./Dropdown"

type Props = {
  reportList: ReportData[]
  timestamp: Date
}

type ChartDataType = [[string, keyof ReportData], ...[Date, number]]
type AnalysisType = { label: string; value: keyof ReportData }

const MultiChart = ({ reportList, timestamp }: Props) => {
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
  const [analysisStartDate, setAnalysisStartDate] = useState(new Date())
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([
    { label: ChartLable.SPEED_INDEX, value: ChartIndex.SPEED_INDEX },
    { label: ChartLable.TBT, value: ChartIndex.TBT },
    { label: ChartLable.FCP, value: ChartIndex.FCP },
  ])

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

  const parseChartData = () => {
    const analysisValues = analysisTypes.map((analysisType) => analysisType.value)
    const chartDatas = reportList.map((report) => {
      const scores = analysisValues.reduce((acc, analysisValue) => {
        return [...acc, report[analysisValue]]
      }, [] as any)
      return [new Date(report.fetchTime), ...scores]
    })
    //   .filter((parsedReport) => parsedReport[0] > analysisStartDate)

    const chartDateArray: any = [["x", ...analysisValues]]
    setChartData([...chartDateArray, ...chartDatas])
  }

  //   useEffect(() => {
  //     parseChartData()
  //   }, [reportList])

  //   useEffect(() => {
  //     timestamp.setDate(timestamp.getDate() - AnalysisDate.DAY)
  //     setAnalysisStartDate(timestamp)
  //   }, [analysisStartDate])

  return (
    <div>
      <button onClick={parseChartData}>dddd</button>
      <MultiSelect options={chartList} labelledBy={"Select"} onChange={setAnalysisTypes} value={analysisTypes} />
      <Dropdown
        selectTypes={[AnalysisPeriod.DAY, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
        getSelectType={handleDropdown}
      />
      <Chart data={chartData} chartType="LineChart" />
    </div>
  )
}

export default MultiChart
