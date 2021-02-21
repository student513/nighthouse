import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"
import { ReportChart, Table, ReportDatePicker, Loader } from "../components"
import { ChartIndex } from "../constants/ChartIndex"

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
  const [isLoading, setLoading] = useState(true)

  const addReportChart = () => {
    const timeStamp = new Date()
    setChartIdList((oldArray) => [...oldArray, timeStamp.toString()])
  }
  const removeReportChart = (id: ChartId) => {
    const array = chartIdList.filter((chartId) => chartId !== id)
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
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <h2>{match.params.name}</h2>

      <hr />
      <div className="detail-header">
        <h4>분석지표 차트</h4>
      </div>
      <h6>차트를 추가하여 선택된 기간동안의 분석 지표의 변동을 확인할 수 있습니다.</h6>
      <button onClick={addReportChart}>차트 추가</button>

      <div className="chart-grid">
        {reportList.length > 0 ? (
          chartIdList.map((
            chartId,
            index // 1, 2번째
          ) =>
            index === 0 ? (
              <div key={chartId}>
                <ReportChart
                  reportList={reportList}
                  removeReportChart={() => removeReportChart(chartId)}
                  chartId={chartId}
                  defaultChartIndex={ChartIndex.PERFORMANCE}
                />
              </div>
            ) : (
              <div key={chartId}>
                <ReportChart
                  reportList={reportList}
                  removeReportChart={() => removeReportChart(chartId)}
                  chartId={chartId}
                />
              </div>
            )
          )
        ) : (
          <div>분석 결과가 없습니다!</div>
        )}
      </div>
      <hr />
      <h4>날짜별 리포트 조회</h4>
      <h6>해당 날짜의 라이트하우스 리포트를 조회할 수 있습니다.</h6>
      <ReportDatePicker reportList={reportList} />
      <hr />
      <h4>분석지표 테이블</h4>
      <h6>선택된 기간동안의 분석 지표의 최소, 최대, 중앙값을 확인할 수 있습니다.</h6>
      <Table reportList={reportList} />
    </>
  )
}

export default Details
