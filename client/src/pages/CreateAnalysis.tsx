import { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

import api from "../api";
import TextInput from "../components/TextInput";

const Button = styled.a.attrs({
  className: `btn btn-primary`,
})``;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})``;

const CreateAnalysis = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };
  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value);
  };

  const insertUrlInfo = async () => {
    const payload = { name, url };
    await api.createURL(payload).then((res) => {
      console.log("url이 성공적으로 입력되었습니다");
    });
  };

  return (
    <div className="create-container">
      <Card>
        <Card.Header as="h5">Create Report</Card.Header>
        <Card.Body
          style={{ paddingTop: 30, paddingRight: 200, paddingLeft: 200 }}
        >
          <TextInput
            label="name"
            value={name}
            handleChange={handleChangeName}
          />
          <TextInput label="url" value={url} handleChange={handleChangeUrl} />
          <Button onClick={insertUrlInfo} href={"/url/list"}>
            Create
          </Button>
          <CancelButton href={"/"}>Cancel</CancelButton>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CreateAnalysis;
