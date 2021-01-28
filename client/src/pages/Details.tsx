import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData, ScoreData } from "../interfaces/ReportType"
import { ChartIndex } from "../constants/ChartIndex"
import Chart from "../components/Chart"
import Dropdown from "../components/Dropdown"

type Props = {
  profileId: string
}

const Details = ({ match }: RouteComponentProps<Props>) => {
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

  const [reportList, setReportList] = useState<ReportData[]>([])
  const [selectedType, setSelectedType] = useState<keyof ReportData>("speedIndex")
  const [chartData, setChartData] = useState<(string | number | ScoreData)[][]>([])

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  const getSelectType = (e: any) => {
    setSelectedType(e.target.value)
    parseChartData(selectedType)
  }
  const parseChartData = (chartIndex: keyof ReportData) => {
    const chartDataArray = reportList.map((report) => {
      if (
        chartIndex ===
        (ChartIndex.SPEED_INDEX ||
          ChartIndex.TBT ||
          ChartIndex.FCP ||
          ChartIndex.TTI ||
          ChartIndex.LCP ||
          ChartIndex.CLS ||
          ChartIndex.UJ ||
          ChartIndex.SRT)
      )
        return [report.createdAt, report[chartIndex].numericValue]
      else return [report.createdAt, report[chartIndex]]
    })
    setChartData(chartDataArray)
  }

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  return (
    <div>
      <Chart />
      <Dropdown chartTypes={chartList} getSelectType={getSelectType} />
    </div>
  )
}

export default Details
