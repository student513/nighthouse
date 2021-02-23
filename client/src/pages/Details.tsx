import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import uuid from "uuid"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
import { ChartIdentifier } from "../interfaces/ChartType"
import { ReportChart, Table, ReportDatePicker, Loader, MultiChart } from "../components"
import { ChartIndex } from "../constants/ChartIndex"
import { Warning } from "../constants/Warning"

import "../style/Details.css"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
  profileId: string
  name: string
}

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([])
  const [chartIdentifierList, setChartIdList] = useState<ChartIdentifier[]>([])
  const [isLoading, setLoading] = useState(true)

  const addReportChart = () => {
    setChartIdList((oldArray) => [...oldArray, uuid.v4()])
  }
  const removeReportChart = (id: string) => {
    const array = chartIdentifierList.filter((chartIdentifier) => chartIdentifier !== id)
    setChartIdList(array)
  }

  useEffect(() => {
    const getReportListByProfileId = async (id: string) => {
      try {
        const reports = await getReports(id)
        setReportList(reports.data.data)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    getReportListByProfileId(match.params.profileId)
    addReportChart()
    addReportChart()
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <h2>{match.params.name}</h2>

      <hr />
      <h4>분석지표 차트</h4>
      <h6>차트를 추가하여 선택된 기간동안의 분석 지표의 변동을 확인할 수 있습니다.</h6>
      <button onClick={addReportChart}>차트 추가</button>

      <div className="chart-grid">
        {reportList && reportList.length > 0 ? (
          chartIdentifierList.map((chartIdentifier, index) =>
            index === 0 ? (
              <div key={chartIdentifier}>
                <ReportChart
                  {...{ reportList, chartIdentifier }}
                  removeReportChart={() => removeReportChart(chartIdentifier)}
                  defaultChartIndex={ChartIndex.PERFORMANCE}
                />
              </div>
            ) : index === 1 ? (
              <div key={chartIdentifier}>
                <ReportChart
                  {...{ reportList, chartIdentifier }}
                  removeReportChart={() => removeReportChart(chartIdentifier)}
                  defaultChartIndex={ChartIndex.SPEED_INDEX}
                />
              </div>
            ) : (
              <div key={chartIdentifier}>
                <ReportChart
                  {...{ reportList, chartIdentifier }}
                  removeReportChart={() => removeReportChart(chartIdentifier)}
                />
              </div>
            )
          )
        ) : (
          <div>{Warning.NOT_YET_CREATE_RERORT}</div>
        )}
      </div>
      <hr />
      <h4>다중 분석지표 차트</h4>
      <h6>여러 지표의 변동을 비교할 수 있습니다.</h6>
      {reportList && reportList.length > 0 ? (
        <MultiChart {...{ reportList }} />
      ) : (
        <div>{Warning.NOT_YET_CREATE_RERORT}</div>
      )}

      <hr />
      <h4>날짜별 리포트 조회</h4>
      <h6>해당 날짜의 라이트하우스 리포트를 조회할 수 있습니다.</h6>
      {reportList && reportList.length > 0 ? (
        <ReportDatePicker {...{ reportList }} />
      ) : (
        <div>{Warning.NOT_YET_CREATE_RERORT}</div>
      )}
      <hr />
      <h4>분석지표 테이블</h4>
      <h6>선택된 기간동안의 분석 지표의 최소, 최대, 중앙값을 확인할 수 있습니다.</h6>
      {reportList && reportList.length > 0 ? <Table {...{ reportList }} /> : <div>{Warning.NOT_YET_CREATE_RERORT}</div>}
    </>
  )
}

export default Details
