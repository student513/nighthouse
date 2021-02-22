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
    <div className="card-list-container">
      {urls && urls.length > 0 ? (
        urls.map(({ name, _id, url, deviceType, createdAt }, index) => (
          <ReportCard key={_id} {...{ name, _id, url, deviceType, deleteAnalysisCard, index, createdAt }} />
        ))
      ) : (
        <div>리스트가 없습니다.</div>
      )}
    </div>
  )
}

export default AnalysisList
