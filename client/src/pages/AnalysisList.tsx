import { useEffect, useState } from "react";
import styled from "styled-components";

import api from "../api";

const DeleteButton = styled.button.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

const AnalysisList = () => {
  const [urls, setUrl] = useState([]);

  const getAllUrls = async () => {
    const urlList = await api.getURLs();
    setUrl(urlList.data.data);
  };

  const deleteAnalysisCard = async (id: string) => {
    await api.deleteURL(id);
    getAllUrls();
  };

  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div>
      {urls.length > 0 ? (
        urls.map((url, index) => (
          <div key={index}>
            <div>{url["name"]}</div>
            <div>{url["url"]}</div>
            <DeleteButton onClick={() => deleteAnalysisCard(url["_id"])}>
              Delete
            </DeleteButton>
          </div>
        ))
      ) : (
        <div>리스트가 없습니다.</div>
      )}
    </div>
  );
};

export default AnalysisList;
