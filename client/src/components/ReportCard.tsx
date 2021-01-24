import { Card } from "react-bootstrap";
import styled from "styled-components";

const Button = styled.a.attrs({
  className: `btn btn-primary`,
})`
  margin-right: 30px;
`;

const DeleteButton = styled.button.attrs({
  className: `btn btn-danger`,
})``;

const CardContainer = styled.div.attrs({})`
  margin-bottom: 5vh;
`;

type Props = {
  name: string;
  url: string;
  _id: string;
  index: number;
  deleteAnalysisCard: (id: string) => void;
};

const ReportCard = ({ name = "defaultName", url = "defaultUrl", _id = "defaultId", deleteAnalysisCard, index = 0 }: Props) => {
  return (
    <CardContainer>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{url}</Card.Subtitle>
          <Button href={`/url/list/${index}`}>Detail</Button>
          <DeleteButton onClick={() => deleteAnalysisCard(_id)}>Delete</DeleteButton>
        </Card.Body>
      </Card>
    </CardContainer>
  );
};

export default ReportCard;
