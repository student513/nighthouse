import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"

import { cardDateParser } from "../utils/TimeParser"
import { getLatestReport } from "../api"

import "../style/ReportCard.css"
import { DeviceDetail, DeviceType } from "../constants/Options"

type Props = {
  name: string
  url: string
  _id: string
  deviceType: string
  index: number
  deleteAnalysisCard: (id: string) => void
}

const ReportCard = ({ name, url, _id, deviceType, deleteAnalysisCard, index = 0 }: Props) => {
  const [latestCreatedAt, setLatestCreatedAt] = useState("")

  useEffect(() => {
    const getLatestReportCreatedAt = async (profileId: string) => {
      const latestReport = await getLatestReport(profileId)
      latestReport.status === 200 ? setLatestCreatedAt(latestReport.data.data[0].fetchTime) : setLatestCreatedAt("-")
    }
    getLatestReportCreatedAt(_id)
  }, [latestCreatedAt, _id])

  return (
    <Card className="card-container">
      <Card.Body>
        <Card.Title className="card-title">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted card-sub-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </Card.Subtitle>
        <div className="option-font">
          [{deviceType === DeviceType.MOBILE ? DeviceDetail.MOBILE : DeviceDetail.DESKTOP}]
        </div>
        <a className="btn btn-primary" href={`/url/list/${name}/${_id}`}>
          Detail
        </a>
        <button className="btn btn-danger" onClick={() => deleteAnalysisCard(_id)}>
          Delete
        </button>
        <hr />
        최근 분석: {cardDateParser(latestCreatedAt)}
      </Card.Body>
    </Card>
  )
}

export default ReportCard
