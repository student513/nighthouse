import { useState, useCallback } from "react"
import { Table as BootTable } from "react-bootstrap"

import { ReportData, RepresentationValue } from "../interfaces/ReportType"
import { NotReportScore } from "../constants/ChartIndex"
import Dropdown from "./Dropdown"
import { AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import { ReportErrorMessage } from "../constants/error"
import { getRepresentativeValues } from "../utils/TableValue"

import "../style/Table.css"

type Props = {
  reportList: ReportData[]
}

const Table = ({ reportList }: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>(AnalysisPeriod.NONE)
  const [analysisStartDate, setAnalysisStartDate] = useState<Date>(new Date())
  const [tableValues, setTableValues] = useState<RepresentationValue[]>()

  const parseReportByPeriod = () => {
    if (selectedPeriod === AnalysisPeriod.NONE) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const periodParsedReportList = reportList.filter((report) => new Date(report.fetchTime) > analysisStartDate)

    const parsedReportCollection: any = {} //타입정의 필요
    ;(Object.keys(periodParsedReportList[0]) as Array<keyof ReportData>).forEach((key: keyof ReportData) => {
      periodParsedReportList.forEach((periodParsedReport: ReportData) => {
        if (
          ![
            NotReportScore.ID,
            NotReportScore.PROFILE_ID,
            NotReportScore.REQUESTED_URL,
            NotReportScore.UPDATED_AT,
            NotReportScore.V,
            NotReportScore.CREATED_AT,
            NotReportScore.FETCH_TIME,
            NotReportScore.FINAL_URL,
          ].includes(key)
        ) {
          parsedReportCollection[key]
            ? parsedReportCollection[key].push(periodParsedReport[key])
            : (parsedReportCollection[key] = [periodParsedReport[key]])
        }
      })
    })
    setTableParsedValues(parsedReportCollection)
  }

  const setTableParsedValues = (reportListCollection: any) => {
    // _id, url등 불필요한 데이터도 전송됨
    const valueList = Object.keys(reportListCollection).map((key) => {
      return getRepresentativeValues(reportListCollection[key], key)
    })
    setTableValues(valueList)
  }

  const getSelectDateType = useCallback(
    (e: any) => {
      const period = new Date()
      if (e.target.value === AnalysisPeriod.WEEK) {
        period.setDate(period.getDate() - AnalysisDate.WEEK)
      } else if (e.target.value === AnalysisPeriod.HALF_MONTH) {
        period.setDate(period.getDate() - AnalysisDate.HALF_MONTH)
      } else {
        period.setDate(period.getDate() - AnalysisDate.MONTH)
      }
      setSelectedPeriod(e.target.value)
      setAnalysisStartDate(period)
    },
    [analysisStartDate, selectedPeriod]
  )

  return (
    <div className="TableContainer">
      <div className="TableSubmit">
        <Dropdown
          selectTypes={[AnalysisPeriod.NONE, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={getSelectDateType}
        />
        <button onClick={parseReportByPeriod}>조회</button>
      </div>
      <BootTable striped bordered hover>
        <thead>
          <tr>
            <th>지표</th>
            <th>평균값</th>
            <th>중앙값</th>
            <th>최소값</th>
            <th>최대값</th>
          </tr>
        </thead>
        <tbody>
          {tableValues?.map(({ valueName, mean, median, min, max }, index) => (
            <tr key={index}>
              <td>{valueName}</td>
              <td>{mean}</td>
              <td>{median}</td>
              <td>{min}</td>
              <td>{max}</td>
            </tr>
          ))}
        </tbody>
      </BootTable>
    </div>
  )
}
export default Table
