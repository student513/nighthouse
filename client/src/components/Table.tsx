import { useState } from "react"
import { useEffectOnce } from "react-use"
import { Table as BootTable } from "react-bootstrap"

import Dropdown from "./Dropdown"

import { ReportData, RepresentationValue } from "../interfaces/ReportType"
import { AnalysisPeriod, AnalysisDate } from "../constants/ChartIndex"
import { getRepresentativeValues } from "../utils/TableValue"
import { pushScoreToCollection } from "../utils/ScoreCollection"
import { setDefaultPeriod } from "../utils/DisplayPeriod"
import { useSelectDate } from "../utils/customHook/useSelectDate"

import "../style/Table.css"

type Props = {
  reportList: ReportData[]
}

const Table = ({ reportList }: Props) => {
  const { analysisStartDate, setAnalysisStartDate, handleDropdown } = useSelectDate(new Date())
  const [tableValues, setTableValues] = useState<RepresentationValue[]>()

  const parseReportByPeriod = () => {
    const periodParsedReportList = reportList.filter((report) => new Date(report.fetchTime) > analysisStartDate)
    parseReportDataByTimeSeries(periodParsedReportList)
  }
  const parseReportDataByTimeSeries = (periodParsedReportList: ReportData[]) => {
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

  useEffectOnce(() => {
    const timestamp = setDefaultPeriod(AnalysisDate.WEEK)
    setAnalysisStartDate(timestamp)
    const periodParsedReportList = reportList.filter((report) => new Date(report.fetchTime) > timestamp)
    parseReportDataByTimeSeries(periodParsedReportList)
  })

  return (
    <>
      <div className="table-submit">
        <Dropdown
          selectTypes={[AnalysisPeriod.WEEK, AnalysisPeriod.HALF_MONTH, AnalysisPeriod.MONTH]}
          getSelectType={handleDropdown}
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
        {reportList?.length > 0 ? (
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
        ) : (
          <tbody>
            <td>분석 결과가 없습니다!</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tbody>
        )}
      </BootTable>
    </>
  )
}
export default Table
