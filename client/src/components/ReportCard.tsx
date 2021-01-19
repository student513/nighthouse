import { Card } from "react-bootstrap";
import styled from "styled-components";

import "../style/ReportCard.css";

const Button = styled.a.attrs({
  className: `btn btn-primary`,
})`
  margin-right: 30px;
`;

const DeleteButton = styled.button.attrs({
  className: `btn btn-danger`,
})``;

type Props = {
  name: string;
  url: string;
  id: string;
  deleteAnalysisCard: Function;
};

const ReportCard = ({
  name = "defaultValue",
  url = "defaultValue",
  id = "defaultValue",
  deleteAnalysisCard,
}: Props) => {
  return (
    <div className="report-card">
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{url}</Card.Subtitle>
          <Button href="#">Detail</Button>
          <DeleteButton onClick={() => deleteAnalysisCard(id)}>
            Delete
          </DeleteButton>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ReportCard;
