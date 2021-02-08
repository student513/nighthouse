import { Card } from "react-bootstrap"

import { cardDateParser } from "../utils/TimeParser"

import "../style/ReportCard.css"

type Props = {
  name: string
  url: string
  _id: string
  deviceType: string
  index: number
  createdAt: string
  deleteAnalysisCard: (id: string) => void
}

const ReportCard = ({ name, url, _id, deviceType, deleteAnalysisCard, createdAt, index = 0 }: Props) => {
  return (
    <Card className="card-container">
      <Card.Body>
        <Card.Title className="card-title">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted card-sub-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </Card.Subtitle>
        <div className="option-font">[{deviceType}]</div>
        <a className="btn btn-primary" href={`/url/list/${name}/${_id}`}>
          Detail
        </a>
        <button className="btn btn-danger" onClick={() => deleteAnalysisCard(_id)}>
          Delete
        </button>
        <hr />
        생성: {cardDateParser(createdAt)}
      </Card.Body>
    </Card>
  )
}

export default ReportCard
