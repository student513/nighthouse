import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../helper/interface"
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

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  const getSelectType = (e: any) => {
    setSelectedType(e.target.value)
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
