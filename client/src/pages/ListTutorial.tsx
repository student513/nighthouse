import { Button } from "react-bootstrap"

const ListTutorial = () => {
  return (
    <div className="tutorial-container">
      <h2>튜토리얼: 프로파일 목록 관리하기</h2>
      <hr />
      <h4>1. 프로파일 목록 확인하기</h4>
      <hr />
      <p>생성된 프로파일 목록은 Profile List 탭에서 확인할 수 있습니다.</p>
      <p>프로파일들은 매 시간 정각에 성능측정 리포트를 자동으로 생성하고 30분에 업데이트됩니다.</p>
      <img className="tutorial-img" src="/img/profile-list-1.png" />
      <h4>2. 프로파일 카드</h4>
      <hr />
      <img className="tutorial-img-small" src="/img/profile-list-card.png" />

      <p>1. 프로파일명</p>
      <p>2. 분석 중인 URL입니다. 클릭 시 해당 페이지로 이동할 수 있습니다.</p>
      <p>3. 프로파일 생성 단계에서 설정한 시뮬레이션 디바이스입니다. </p>
      <p>
        4. Detail 버튼 클릭 시 프로파일 분석 결과를 조회할 수 있습니다. Delete 버튼 클릭 시 프로파일이 삭제됩니다. 해당
        액션은 돌이킬 수 없으니 주의 바랍니다.
      </p>
      <p>5. 프로파일이 생성된 시각입니다.</p>
      <br />
      <br />
      <div className="move-button">
        <Button href="/create-tutorial" size="lg" variant="secondary">
          {"< "}이전: 프로파일 생성하기
        </Button>
        <Button href="/detail-tutorial" size="lg" variant="primary">
          다음: 리포트 분석하기{" >"}
        </Button>
      </div>
    </div>
  )
}

export default ListTutorial
