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

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([])
  const [chartArray, setChartArray] = useState<string[]>([])

  const addReportChart = () => {
    setChartArray((oldArray) => [...oldArray, uuid.v4()])
  }
  const removeReportChart = (id: string) => {
    const array = chartArray.filter((chart) => chart !== id)
    setChartArray(array)
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
      <h2>{match.params.name}</h2>
      <button onClick={addReportChart}>차트 추가</button>
      <div className="ChartGrid">
        {chartArray.map((chartId) => (
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
