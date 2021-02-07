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
    parseReportDataByTimeSeries(periodParsedReportList)
  }
  const parseReportDataByTimeSeries = (periodParsedReportList: ReportData[]) => {
    if (periodParsedReportList.length === 0) {
      alert(ReportErrorMessage.NOT_SELECT_PERIOD)
      return
    }
    const parsedReportCollection = periodParsedReportList.reduce(
      (acc, cur) => {
        acc["speedIndex"] ? acc["speedIndex"].push(cur.speedIndex) : (acc["speedIndex"] = [cur["speedIndex"]])
        acc["totalBlockingTime"]
          ? acc["totalBlockingTime"].push(cur.totalBlockingTime)
          : (acc["totalBlockingTime"] = [cur.totalBlockingTime])
        acc["firstContentfulPaint"]
          ? acc["firstContentfulPaint"].push(cur.firstContentfulPaint)
          : (acc["firstContentfulPaint"] = [cur.firstContentfulPaint])
        acc["timeToInteractive"]
          ? acc["timeToInteractive"].push(cur.timeToInteractive)
          : (acc["timeToInteractive"] = [cur.timeToInteractive])
        acc["largestContentfulPaint"]
          ? acc["largestContentfulPaint"].push(cur.largestContentfulPaint)
          : (acc["largestContentfulPaint"] = [cur.largestContentfulPaint])
        acc["cumulativeLayoutShift"]
          ? acc["cumulativeLayoutShift"].push(cur.cumulativeLayoutShift)
          : (acc["cumulativeLayoutShift"] = [cur.cumulativeLayoutShift])
        acc["unminifiedJavascript"]
          ? acc["unminifiedJavascript"].push(cur.unminifiedJavascript)
          : (acc["unminifiedJavascript"] = [cur.unminifiedJavascript])
        acc["serverResponseTime"]
          ? acc["serverResponseTime"].push(cur.serverResponseTime)
          : (acc["serverResponseTime"] = [cur.serverResponseTime])
        acc["performance"] ? acc["performance"].push(cur.performance) : (acc["performance"] = [cur.performance])
        acc["accessibility"]
          ? acc["accessibility"].push(cur.accessibility)
          : (acc["accessibility"] = [cur.accessibility])

        acc["bestPractices"]
          ? acc["bestPractices"].push(cur.bestPractices)
          : (acc["bestPractices"] = [cur.bestPractices])
        acc["seo"] ? acc["seo"].push(cur.seo) : (acc["seo"] = [cur.seo])

        return acc
      },
      {
        speedIndex: [] as number[],
        totalBlockingTime: [] as number[],
        firstContentfulPaint: [] as number[],
        timeToInteractive: [] as number[],
        largestContentfulPaint: [] as number[],
        cumulativeLayoutShift: [] as number[],
        unminifiedJavascript: [] as number[],
        serverResponseTime: [] as number[],
        performance: [] as number[],
        accessibility: [] as number[],
        bestPractices: [] as number[],
        seo: [] as number[],
      }
    )
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
    </div>
  )
}
export default Table
