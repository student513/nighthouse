import { useState } from "react"
import Card from "react-bootstrap/Card"

import { createURL } from "../api"
import TextInput from "../components/TextInput"
import { UrlPayload } from "../interfaces/ProfileType"
import Dropdown from "../components/Dropdown"
import { useDropdown } from "../utils/customHook/useDropdown"
import { DeviceDetail, DeviceType } from "../constants/Options"

const CreateAnalysis = () => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [deviceDetail, setDeviceDetail] = useDropdown(DeviceDetail.DESKTOP)
  const [deviceType, setDeviceType] = useState(DeviceType.DESKTOP)

  const handleChangeName = (event: any) => {
    setName(event.target.value)
  }
  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value)
  }

  const insertUrlInfo = async () => {
    deviceDetail === DeviceDetail.MOBILE ? setDeviceType(DeviceType.MOBILE) : setDeviceType(DeviceType.DESKTOP)
    const payload: UrlPayload = { name, url, deviceType }
    await createURL(payload)
  }

  return (
    <div className="create-container">
      <Card>
        <Card.Header as="h4">프로파일 생성</Card.Header>
        <Card.Body style={{ paddingTop: 30, paddingRight: 200, paddingLeft: 200 }}>
          <span>성능 분석을 원하는 웹 사이트의 프로파일을 생성해주세요.</span>
          <br />
          <br />
          <TextInput label="name" value={name} handleChange={handleChangeName} />
          <TextInput label="url" value={url} handleChange={handleChangeUrl} />
          {/* <Dropdown selectTypes={[DeviceDetail.MOBILE, DeviceDetail.DESKTOP]} getSelectType={setDeviceDetail} /> */}
          <br />
          <br />
          <a className="btn btn-primary" onClick={insertUrlInfo} href={"/url/list"}>
            Create
          </a>
          <a className="btn btn-danger" href={"/"}>
            Cancel
          </a>
        </Card.Body>
      </Card>
    </div>
  )
}
export default CreateAnalysis
