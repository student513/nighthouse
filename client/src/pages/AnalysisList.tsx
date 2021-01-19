import { useEffect, useState } from "react";

import { getURLs, deleteURL } from "../api";
import ReportCard from "../components/ReportCard";
import "../style/AnalysisList.css";

const AnalysisList = () => {
  const [urls, setUrl] = useState([]);

  const getAllUrls = async () => {
    const urlList = await getURLs();
    setUrl(urlList.data.data);
  };

  const deleteAnalysisCard = async (id: string) => {
    await deleteURL(id);
    getAllUrls();
  };

  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="card-container">
      {urls.length > 0 ? (
        urls.map((url, index) => (
          <ReportCard
            key={index}
            name={url["name"]}
            url={url["url"]}
            id={url["_id"]}
            deleteAnalysisCard={deleteAnalysisCard}
          />
        ))
      ) : (
        <div>리스트가 없습니다.</div>
      )}
    </div>
  );
};

export default AnalysisList;
