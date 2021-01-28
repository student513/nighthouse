import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
import { ChartIndex, AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import Chart from "../components/Chart"
import Dropdown from "../components/Dropdown"

type Props = {
  profileId: string
}

const Details = ({ match }: RouteComponentProps<Props>) => {
  const chartList = [
    "-",
    ChartIndex.SPEED_INDEX,
    ChartIndex.TBT,
    ChartIndex.FCP,
    ChartIndex.TTI,
    ChartIndex.LCP,
    ChartIndex.CLS,
    ChartIndex.UJ,
    // ChartIndex.SRT,
    ChartIndex.PERFORMANCE,
    ChartIndex.ACCESSIBILITY,
    // ChartIndex.BEST_PRACTICE,
    ChartIndex.SEO,
  ]

  const [reportList, setReportList] = useState<ReportData[]>([])
  const [chartData, setChartData] = useState<any>([]) // 타입을 어떻게 줘야할지 모르겠음
  const [analysisStartDate, setAnalysisStartDate] = useState<Date>(new Date())
  const [analysisType, setAnalysisType] = useState<keyof ReportData>(ChartIndex.SPEED_INDEX)

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

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
    setAnalysisStartDate(period)
  }

  const parseChartData = () => {
    const chartDataArray = reportList.map((report) => {
      if (
        analysisType === ChartIndex.SPEED_INDEX ||
        analysisType === ChartIndex.TBT ||
        analysisType === ChartIndex.FCP ||
        analysisType === ChartIndex.TTI ||
        analysisType === ChartIndex.LCP ||
        analysisType === ChartIndex.CLS ||
        analysisType === ChartIndex.UJ
        // chartIndex === ChartIndex.SRT
        // &&new Date(report.createdAt) > analysisStartDate
      )
        return [new Date(report.createdAt), report[analysisType].numericValue]
      else return [new Date(report.createdAt), report[analysisType]]
    })

    chartDataArray.unshift(["x", analysisType])
    setChartData(chartDataArray)
  }

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  return (
    <div>
      {chartData.length > 0 ? <Chart data={chartData} /> : <div>데이터를 선택해주세요</div>}
      <Dropdown selectTypes={chartList} getSelectType={getSelectChartType} />
      <Dropdown
        selectTypes={["-", AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
        getSelectType={getSelectDateType}
      />
      <button onClick={parseChartData}>제출</button>
    </div>
  )
}

export default Details
