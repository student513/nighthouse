import { useState } from "react"
import { Table as BootTable } from "react-bootstrap"

import { ReportData, RepresentationValue } from "../interfaces/ReportType"
import Dropdown from "./Dropdown"
import { AnalysisPeriod } from "../constants/ChartIndex"
import { ReportErrorMessage } from "../constants/error"
import { getRepresentativeValues } from "../utils/TableValue"
import { useSelectDate } from "../utils/customHook/useSelectDate"

import "../style/Table.css"

type Props = {
  reportList: ReportData[]
}

const Table = ({ reportList }: Props) => {
  const [analysisStartDate, setAnalysisStartDate] = useSelectDate(new Date())
  const [tableValues, setTableValues] = useState<RepresentationValue[]>()

  const parseReportByPeriod = () => {
    const periodParsedReportList = reportList.filter((report) => new Date(report.fetchTime) > analysisStartDate)
    if (periodParsedReportList.length === 0) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const parsedReportCollection: any = {}
    ;(Object.keys(periodParsedReportList[0]) as Array<keyof ReportData>).forEach((key: keyof ReportData) => {
      periodParsedReportList.forEach((periodParsedReport: ReportData) => {
        parsedReportCollection[key]
          ? parsedReportCollection[key].push(periodParsedReport[key])
          : (parsedReportCollection[key] = [periodParsedReport[key]])
      })
    })
    setTableParsedValues(parsedReportCollection)
  }

  const setTableParsedValues = (reportListCollection: any) => {
    const valueList = Object.keys(reportListCollection)
      .filter((key) => typeof reportListCollection[key][0] === "number")
      .map((key) => {
        return getRepresentativeValues(reportListCollection[key], key)
      })
    valueList.pop() // __v 제거
    setTableValues(valueList)
  }

  return (
    <div className="TableContainer">
      <div className="TableSubmit">
        <Dropdown
          selectTypes={[AnalysisPeriod.NONE, AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={setAnalysisStartDate}
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
