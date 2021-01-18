import { useState } from "react";
import styled from "styled-components";

import api from "../api";

const Button = styled.a.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;
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
    <div>
      <label>Name: </label>
      <input type="text" value={name} onChange={handleChangeName} />

      <label>Url: </label>
      <input type="text" value={url} onChange={handleChangeUrl} />

      <Button onClick={insertUrlInfo} href={"/url/list"}>
        Analysis
      </Button>
      <CancelButton href={"/"}>Cancel</CancelButton>
    </div>
  );
};
export default CreateAnalysis;
