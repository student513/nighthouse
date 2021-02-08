import { Card } from "react-bootstrap"

import "../style/ReportCard.css"

type Props = {
  name: string
  url: string
  _id: string
  index: number
  deleteAnalysisCard: (id: string) => void
}

const ReportCard = ({ name, url, _id, deleteAnalysisCard, index = 0 }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{url}</Card.Subtitle>
        <a className="btn btn-primary" href={`/url/list/${name}/${_id}`}>
          Detail
        </a>
        <button className="btn btn-danger" onClick={() => deleteAnalysisCard(_id)}>
          Delete
        </button>
      </Card.Body>
    </Card>
  )
}

export default ReportCard
