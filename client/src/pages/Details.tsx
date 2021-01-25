import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getReports } from "../api"
import { ReportData } from "../helper/interface"
import Chart from "../components/Chart"

type Props = {
  profileId: string
}

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([])
  const [dataType, setDataType] = useState("")

  useEffect(() => {
    getReportsByProfileId(match.params.profileId)
  }, [])

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id)
    setReportList(reports.data.data)
  }

  const parseChartData = () => {}

  return (
    <div>
      <Chart />
    </div>
  )
}

export default Details
