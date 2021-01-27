import { useState } from "react"
import styled from "styled-components"
import Card from "react-bootstrap/Card"

import { createURL } from "../api"
import TextInput from "../components/TextInput"
import { UrlPayload } from "../interfaces/ProfileType"

const Button = styled.a.attrs({
  className: `btn btn-primary`,
})``

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})``

const CreateAnalysis = () => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const handleChangeName = (event: any) => {
    setName(event.target.value)
  }
  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value)
  }

  const insertUrlInfo = async () => {
    const payload: UrlPayload = { name, url }
    await createURL(payload)
  }

  return (
    <div className="create-container">
      <Card>
        <Card.Header as="h5">Create Report</Card.Header>
        <Card.Body style={{ paddingTop: 30, paddingRight: 200, paddingLeft: 200 }}>
          <TextInput label="name" value={name} handleChange={handleChangeName} />
          <TextInput label="url" value={url} handleChange={handleChangeUrl} />
          <Button onClick={insertUrlInfo} href={"/url/list"}>
            Create
          </Button>
          <CancelButton href={"/"}>Cancel</CancelButton>
        </Card.Body>
      </Card>
    </div>
  )
}
export default CreateAnalysis
