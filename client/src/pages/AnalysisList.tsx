import { useEffect, useState } from "react"

import { getURLs, deleteURL } from "../api"
import ReportCard from "../components/ReportCard"
import { AnalysisTargetUrl } from "../interfaces/ProfileType"
import "../style/AnalysisList.css"

const AnalysisList = () => {
  const [urls, setUrl] = useState<AnalysisTargetUrl[]>([])

  const getAllUrls = async () => {
    const urlList = await getURLs()
    setUrl(urlList.data.data)
  }

  const deleteAnalysisCard = async (id: string) => {
    await deleteURL(id)
    getAllUrls()
  }

  useEffect(() => {
    getAllUrls()
  }, [])

  return (
    <>
      <h3>프로파일 목록</h3>
      <span>프로파일의 분석은 매 시간 30분에 업데이트됩니다.</span>
      <hr />
      <div className="card-list-container">
        {urls.length > 0 ? (
          urls.map(({ name, _id, url, deviceType, createdAt }, index) => (
            <ReportCard key={_id} {...{ name, _id, url, deviceType, deleteAnalysisCard, index, createdAt }} />
          ))
        ) : (
          <div>리스트가 없습니다.</div>
        )}
      </div>
    </>
  )
}

export default AnalysisList
