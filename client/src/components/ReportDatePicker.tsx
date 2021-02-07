import { useState, useCallback, useEffect } from "react"
import DatePicker from "react-datepicker"

import { ReportData } from "../interfaces/ReportType"

import "react-datepicker/dist/react-datepicker.css"

type Props = {
  reportList: ReportData[]
}

const ReportDatePicker = ({ reportList }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateReports, setSelectedDateReports] = useState<ReportData[]>([])

  const handleDatePicker = useCallback(
    (date: Date) => {
      setSelectedDate(date)
    },
    [selectedDate]
  )

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

  useEffect(() => {
    showReportsBySelectedDate()
  }, [selectedDate])
  return (
    <>
      <DatePicker selected={selectedDate} onChange={handleDatePicker} />
      {selectedDateReports.length > 0 ? (
        selectedDateReports.map((selectedDateReport) => (
          <div key={selectedDateReport.fetchTime}>{selectedDateReport.fetchTime}</div>
        ))
      ) : (
        <div>해당 일자의 리포트가 없습니다!</div>
      )}
    </>
  )
}

export default ReportDatePicker
