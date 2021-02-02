import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import uuid from "uuid"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
import { ReportChart, Table } from "../components"

import "../style/Details.css"

type Props = {
  profileId: string
  name: string
}

type ChartId = string

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([])
  const [chartIdList, setChartIdList] = useState<ChartId[]>([])

  const addReportChart = () => {
    setChartIdList((oldArray) => [...oldArray, uuid.v4()])
  }
  const removeReportChart = (id: ChartId) => {
    const array = chartIdList.filter((chartId) => chartId !== id)
    setChartIdList(array)
  }

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  return (
    <div>
      <div className="DetailHeader">
        <h2>{match.params.name}</h2>
        <button onClick={addReportChart}>차트 추가</button>
      </div>
      <div className="ChartGrid">
        {chartIdList.map((chartId) => (
          <div key={chartId}>
            <ReportChart
              reportList={reportList}
              removeReportChart={() => removeReportChart(chartId)}
              chartId={chartId}
            />
          </div>
        ))}
      </div>
      <Table reportList={reportList} />
    </div>
  )
}

export default Details
