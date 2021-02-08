import { useState } from "react"
import { Table as BootTable } from "react-bootstrap"

import { ReportData, RepresentationValue } from "../interfaces/ReportType"
import Dropdown from "./Dropdown"
import { AnalysisPeriod } from "../constants/ChartIndex"
import { ReportErrorMessage } from "../constants/error"
import { getRepresentativeValues } from "../utils/TableValue"
import { pushScoreToCollection } from "../utils/ScoreCollection"
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
    parseReportDataByTimeSeries(periodParsedReportList)
  }
  const parseReportDataByTimeSeries = (periodParsedReportList: ReportData[]) => {
    if (periodParsedReportList.length === 0) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const parsedReportCollection = pushScoreToCollection(periodParsedReportList)
    setTableParsedValues(parsedReportCollection)
  }

  const setTableParsedValues = (reportListCollection: any) => {
    const valueList = Object.keys(reportListCollection)
      .filter((key) => typeof reportListCollection[key][0] === "number")
      .map((key) => {
        return getRepresentativeValues(reportListCollection[key], key)
      })
    setTableValues(valueList)
  }

  return (
    <>
      <div className="table-submit">
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
            <th>최소값</th>
            {/* <th>평균값</th> */}
            <th>중앙값</th>
            <th>최대값</th>
          </tr>
        </thead>
        <tbody>
          {tableValues?.map(({ valueName, mean, median, min, max }, index) => (
            <tr key={index}>
              <td>{valueName}</td>
              <td>{min}</td>
              {/* <td>{mean}</td> */}
              <td>{median}</td>
              <td>{max}</td>
            </tr>
          ))}
        </tbody>
      </BootTable>
    </>
  )
}
export default Table
