import { Button } from "react-bootstrap"

import "../style/Tutorial.css"

const Tutorial = () => {
  return (
    <>
      <h2>튜토리얼: 프로파일 생성하기</h2>
      <hr />
      <h4>1. 프로파일 생성</h4>
      <p>Create Test Profile 탭에서 프로파일을 생성할 수 있습니다.</p>
      <img className="tutorial-img" src="/img/create-profile-1.png" />

      <h4>2. 양식 입력</h4>
      <hr />
      <p>분석을 실시할 프로파일의 이름(name)과 주소(url)을 입력해주세요.</p>
      <img className="tutorial-img" src="/img/create-profile-2.png" />

      <h4>3. 시뮬레이션 기기 선택</h4>
      <hr />
      <p>해당 드롭다운 메뉴에서 분석을 시뮬레이션할 기기 종류를 선택할 수 있습니다.</p>
      <img className="tutorial-img" src="/img/create-profile-3.png" />
      <br />
      <br />
      <div className="move-button">
        <Button href="/list-tutorial" size="lg" variant="primary">
          다음: 프로파일 목록 관리하기{" >"}
        </Button>
      </div>
    </>
  )
}

export default Tutorial
