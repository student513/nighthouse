import { Button } from "react-bootstrap"

const DetailTutorial = () => {
  return (
    <>
      <h2>튜토리얼: 리포트 분석하기</h2>
      <hr />
      <h4>1. 차트 분석하기</h4>
      <p>lighthouse의 성능 지표들을 시계열로 확인할 수 있습니다.</p>
      <hr />
      <img className="tutorial-img" src="/img/detail-chart.png" />
      <p>1. 클릭 시 2번과 같은 차트를 원하는만큼 추가하여 볼 수 있습니다. </p>
      <p>2. 선택된 지표의 변동을 시계열로 확인할 수 있습니다.</p>
      <p>3. 지표와 기간을 선택한 후 제출 버튼을 클릭하면 차트가 표시됩니다.</p>
      <p>4. 더 이상 보길 원하지 않는 차트를 삭제할 수 있습니다.</p>
      <br />

      <h4>2. lighthouse 리포트 확인하기</h4>
      <p>분석 시 생성된 lighthouse의 리포트를 시간대별로 확인할 수 있습니다.</p>
      <hr />
      <img className="tutorial-img" src="/img/profile-report.png" />
      <br />
      <br />
      <h4>3. 테이블 분석하기</h4>
      <p>
        선택된 기간동안의 지표 동향을 확인할 수 있습니다. 성능이 가장 좋을/나쁠 때의 수치는 어떤지, 일반적인 성능은
        어느정도인지 확인해보세요.
      </p>
      <hr />
      <img className="tutorial-img" src="/img/profile-table.png" />
      <div className="move-button">
        <Button href="/list-tutorial" size="lg" variant="secondary">
          {"< "}이전: 프로파일 목록 관리하기
        </Button>
        <Button href="/url/create" size="lg" variant="primary">
          분석 시작하기{" >"}
        </Button>
      </div>
    </>
  )
}

export default DetailTutorial
