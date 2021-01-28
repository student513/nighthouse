import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
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
    // ChartIndex.SRT,
    ChartIndex.PERFORMANCE,
    ChartIndex.ACCESSIBILITY,
    // ChartIndex.BEST_PRACTICE,
    ChartIndex.SEO,
  ]

  const [reportList, setReportList] = useState<ReportData[]>([])
  const [chartData, setChartData] = useState<any>([]) // 타입을 어떻게 줘야할지 모르겠음

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  const getSelectType = (e: any) => {
    parseChartData(e.target.value)
  }

  const parseChartData = (chartIndex: keyof ReportData) => {
    const chartDataArray = reportList.map((report) => {
      if (
        chartIndex === ChartIndex.SPEED_INDEX ||
        chartIndex === ChartIndex.TBT ||
        chartIndex === ChartIndex.FCP ||
        chartIndex === ChartIndex.TTI ||
        chartIndex === ChartIndex.LCP ||
        chartIndex === ChartIndex.CLS ||
        chartIndex === ChartIndex.UJ
        // chartIndex === ChartIndex.SRT
      )
        return [new Date(report.createdAt), report[chartIndex].numericValue]
      else return [new Date(report.createdAt), report[chartIndex]]
    })
    chartDataArray.unshift(["x", chartIndex])
    setChartData(chartDataArray)
  }

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  return (
    <div>
      {chartData.length > 0 ? <Chart data={chartData} /> : <div>데이터를 선택해주세요</div>}
      <Dropdown chartTypes={chartList} getSelectType={getSelectType} />
    </div>
  )
}

export default Details
