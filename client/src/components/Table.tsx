import { useState } from "react"
import { Table as BootTable } from "react-bootstrap"

import { ReportData, RepresentationValue } from "../interfaces/ReportType"
import { ChartIndex } from "../constants/ChartIndex"
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

    const speedIndexBuffer = periodParsedReportList.map((value) => value.speedIndex)
    const TBTBuffer = periodParsedReportList.map((value) => value.totalBlockingTime)
    const FCPBuffer = periodParsedReportList.map((value) => value.firstContentfulPaint)
    const TTIBuffer = periodParsedReportList.map((value) => value.timeToInteractive)
    const LCPBuffer = periodParsedReportList.map((value) => value.largestContentfulPaint)
    const CLSBuffer = periodParsedReportList.map((value) => value.cumulativeLayoutShift)
    const UJBuffer = periodParsedReportList.map((value) => value.unminifiedJavascript)
    const SRTBuffer = periodParsedReportList.map((value) => value.serverResponseTime)
    const performanceBuffer = periodParsedReportList.map((value) => value.performance)
    const accessibilityBuffer = periodParsedReportList.map((value) => value.accessibility)
    const bestPracticeBuffer = periodParsedReportList.map((value) => value.bestPractices)
    const seoBuffer = periodParsedReportList.map((value) => value.seo)
    setTableParsedValues(
      speedIndexBuffer,
      TBTBuffer,
      FCPBuffer,
      TTIBuffer,
      LCPBuffer,
      CLSBuffer,
      UJBuffer,
      SRTBuffer,
      performanceBuffer,
      accessibilityBuffer,
      bestPracticeBuffer,
      seoBuffer
    )
  }

  const setTableParsedValues = (
    speedIndexBuffer: number[],
    TBTBuffer: number[],
    FCPBuffer: number[],
    TTIBuffer: number[],
    LCPBuffer: number[],
    CLSBuffer: number[],
    UJBuffer: number[],
    SRTBuffer: number[],
    performanceBuffer: number[],
    accessibilityBuffer: number[],
    bestPracticeBuffer: number[],
    seoBuffer: number[]
  ) => {
    const speedIndex = getRepresentativeValues(speedIndexBuffer, ChartIndex.SPEED_INDEX)
    const TBT = getRepresentativeValues(TBTBuffer, ChartIndex.TBT)
    const FCP = getRepresentativeValues(FCPBuffer, ChartIndex.FCP)
    const TTI = getRepresentativeValues(TTIBuffer, ChartIndex.TTI)
    const LCP = getRepresentativeValues(LCPBuffer, ChartIndex.LCP)
    const CLS = getRepresentativeValues(CLSBuffer, ChartIndex.CLS)
    const UJ = getRepresentativeValues(UJBuffer, ChartIndex.UJ)
    const SRT = getRepresentativeValues(SRTBuffer, ChartIndex.SRT)
    const performance = getRepresentativeValues(performanceBuffer, ChartIndex.PERFORMANCE)
    const accessibility = getRepresentativeValues(accessibilityBuffer, ChartIndex.ACCESSIBILITY)
    const bestPractices = getRepresentativeValues(bestPracticeBuffer, ChartIndex.BEST_PRACTICE)
    const seo = getRepresentativeValues(seoBuffer, ChartIndex.SEO)

    const valueList = [speedIndex, TBT, FCP, TTI, LCP, CLS, UJ, SRT, performance, accessibility, bestPractices, seo]
    setTableValues(valueList)
  }

  const getSelectDateType = (e: any) => {
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
  }

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
