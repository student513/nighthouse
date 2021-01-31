import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import uuid from "uuid"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"

import { ReportChart, Table } from "../components"

type Props = {
  profileId: string
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
      <button onClick={addReportChart}>차트 추가</button>
      {chartArray.map((chartId) => (
        <div key={chartId}>
          <ReportChart reportList={reportList} />
          <button onClick={() => removeReportChart(chartId)}>차트 삭제</button>
        </div>
      ))}
      <Table reportList={reportList} />
    </div>
  )
}

export default Details
