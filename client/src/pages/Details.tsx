import { createContext, useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../interfaces/ReportType"

import { ReportChart } from "../components"

type Props = {
  profileId: string
}

export const setSelectedReportDateContext = createContext(null)

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([])
  const [selectedReportDate, setSelectedReportDate] = useState<Date>(new Date())

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  return (
    <div>
      <ReportChart reportList={reportList} />
    </div>
  )
}

export default Details
