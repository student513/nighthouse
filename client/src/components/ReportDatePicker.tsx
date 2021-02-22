import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"

import { ReportData } from "../interfaces/ReportType"
import { reportDateParser } from "../utils/TimeParser"
import { getReportCode } from "../api"

import "react-datepicker/dist/react-datepicker.css"
import "../style/ReportDatePicker.css"

type Props = {
  reportList: ReportData[]
}

const ReportDatePicker = ({ reportList }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateReports, setSelectedDateReports] = useState<ReportData[]>([])
  const [foldReportList, setFoldReportList] = useState(true)

  const handleDatePicker = (date: Date) => {
    setSelectedDate(date)
  }

  const showReportsBySelectedDate = () => {
    const selectedReports = reportList.filter((report) => {
      const reportDate = new Date(report.fetchTime)
      return (
        reportDate.getFullYear() === selectedDate.getFullYear() &&
        reportDate.getMonth() === selectedDate.getMonth() &&
        reportDate.getDate() === selectedDate.getDate()
      )
    })
    setSelectedDateReports(selectedReports)
  }

  const toggleFoldReportList = () => {
    setFoldReportList(!foldReportList)
  }

  const openLightHouseReport = async (profileId: string, fetchTime: string) => {
    const reportCode = await getReportCode(profileId, fetchTime)
    const winUrl = URL.createObjectURL(new Blob([reportCode.data.data[0].reportCode], { type: "text/html" }))
    window.open(winUrl)
  }

  useEffect(() => {
    showReportsBySelectedDate()
  }, [selectedDate, reportList])

  return (
    <>
      <DatePicker selected={selectedDate} onChange={handleDatePicker} />
      <button onClick={toggleFoldReportList}>{foldReportList ? "접기" : "펼치기"}</button>
      <br />
      <br />
      {foldReportList ? (
        selectedDateReports.length > 0 ? (
          selectedDateReports.map((selectedDateReport) => {
            return (
              <a
                className="btn btn-primary report-link"
                onClick={() => openLightHouseReport(selectedDateReport.profileId, selectedDateReport.fetchTime)}
                key={selectedDateReport.fetchTime}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reportDateParser(selectedDateReport.fetchTime)}
              </a>
            )
          })
        ) : (
          <div>해당 일자의 리포트가 없습니다!</div>
        )
      ) : (
        <div></div>
      )}
    </>
  )
}

export default ReportDatePicker
