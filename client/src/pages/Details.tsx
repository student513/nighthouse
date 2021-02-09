import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import uuid from "uuid"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
import { ReportChart, Table, ReportDatePicker } from "../components"

import "../style/Details.css"
import "react-datepicker/dist/react-datepicker.css"

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

  const getReportListByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  useEffect(() => {
    getReportListByProfileId(match.params.profileId)
  }, [])

  return (
    <>
      <h2>{match.params.name}</h2>

      <hr />
      <div className="detail-header">
        <h4>주요지표 차트</h4>
        <button onClick={addReportChart}>차트 추가</button>
      </div>
      <div className="chart-grid">
        {reportList.length > 0 ? (
          chartIdList.map((chartId) => (
            <div key={chartId}>
              <ReportChart
                reportList={reportList}
                removeReportChart={() => removeReportChart(chartId)}
                chartId={chartId}
              />
            </div>
          ))
        ) : (
          <div>분석 결과가 없습니다!</div>
        )}
      </div>
      <hr />
      <h4>날짜별 리포트 조회</h4>
      <ReportDatePicker reportList={reportList} />
      <hr />
      <h4>주요지표</h4>
      <Table reportList={reportList} />
    </>
  )
}

export default Details
