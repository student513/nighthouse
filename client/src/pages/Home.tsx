import { Table as BootTable } from "react-bootstrap"

const Home = () => {
  return (
    <>
      <h2>환영합니다!</h2>
      <hr />
      <p>
        본 서비스는 <a href="https://github.com/GoogleChrome/lighthouse-ci">Google lighthouse-ci</a>를 이용하여 개발된
        웹 페이지 성능 측정 툴입니다.
      </p>
      <p>
        성능 측정을 원하는 웹 페이지의 프로파일을 생성하면, 매 시간마다 자동으로 해당 웹 페이지의 성능을 측정하여
        리포트를 생성합니다.
      </p>
      <p>
        생성된 리포트의 분석 지표를 시계열 차트와 테이블 형태로 표시되어 시간대, 날짜대에 따른 웹 페이지의 성능 변화를
        한 눈에 확인하실 수 있습니다.
      </p>
      <p>
        Performance, Accessibility, Best Practice, SEO, PWA는 1점 만점의 스코어이며, 높을 수록 페이지의 성능, 접근성
        등이 우수하다고 판단할 수 있습니다.
      </p>
      <p>
        이외의 스코어들의 단위는 ms로, 페이지가 로드된 후 어떠한 조건을 만족하기까지의 시간입니다. 일반적으로 낮을 수록
        페이지의 성능이 우수하다고 판단할 수 있습니다.
      </p>
      <p>웹 페이지의 성능을 개선하기 위한 방안은 프로파일 내의 날짜별 리포트 조회에서 확인하실 수 있습니다.</p>
      <p>
        프로파일을 생성하여 리포트를 참고하며 성능개선을 위한 권장사항을 구현하며, 웹 페이지가 나날이 개선되는 경험을
        시작해보세요.
      </p>
      <p>
        <strong>프로파일은 매 시간 정각에 분석을 실시하며, 30분에 업로드됩니다.</strong>
      </p>
      <a className="btn btn-primary" href="/url/create">
        프로파일 생성하기
      </a>{" "}
      <a className="btn btn-primary" href="/create-tutorial">
        더 알아보기
      </a>
      <br />
      <br />
      <h2>분석지표 설명</h2>
      <p>프로파일을 생성할 경우 확인할 수 있는 웹 페이지의 분석 지표입니다.</p>
      <hr />
      <BootTable striped bordered hover>
        <thead>
          <tr>
            <td>지표</td>
            <td>설명</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Performance(성능)</td>
            <td>
              First Contentful Paint, Speed Index, Largest Contentful Paint, Time to Interactive, Total Blocking Time,
              Cumulative Layout Shift의 성능 지표로 이루어진 종합 스코어입니다.
            </td>
          </tr>
          <tr>
            <td>Accessibility(접근성)</td>
            <td>
              인지 가능(Perceivable), 작동 가능(Operable), 이해 가능(Understandable), 안정적(Robust)로 이루어진 웹
              접근성 스코어입니다.
            </td>
          </tr>
          <tr>
            <td>Best Practices(권장사항)</td>
            <td>개발 권장사항입니다.</td>
          </tr>
          <tr>
            <td>SEO(검색엔진 최적화)</td>
            <td>페이지가 검색엔진 결과 순위에 최적화되도록 할 수 있습니다.</td>
          </tr>
          <tr>
            <td>PWA(Progressive Web App)</td>
            <td>이 검사는 프로그레시브 웹 앱의 요소를 검사합니다.</td>
          </tr>
          <tr>
            <td>Speed Index</td>
            <td>페이지 콘텐츠가 얼마나 빨리 표시되는지 보여줍니다.</td>
          </tr>
          <tr>
            <td>Total Blocking Time</td>
            <td>
              First Contentful Paint와 Time to Interactive 모든 시간의 합으로, 작업 지속 시간이 50ms를 넘으면 밀리초
              단위로 표현됩니다.
            </td>
          </tr>
          <tr>
            <td>First Contentful Paint</td>
            <td>첫 번째 텍스트 또는 이미지가 그려지는 시간을 나타냅니다.</td>
          </tr>
          <tr>
            <td>Time to Interactive</td>
            <td>페이지가 완전히 상호작용이 가능한 상태가 되는 데 걸리는 시간입니다.</td>
          </tr>
          <tr>
            <td>Largest Contentful Paint</td>
            <td>가장 큰 텍스트 또는 이미지가 그려지는 시간을 나타냅니다.</td>
          </tr>
          <tr>
            <td>Cumulative Layout Shift</td>
            <td>뷰포트 내에서 가시적인 요소의 이동을 측정합니다.</td>
          </tr>
          <tr>
            <td>Unminified Javascript</td>
            <td>JavaScript 파일을 최소화하면 페이로드 크기와 스크립트 구문 분석 시간을 줄일 수 있습니다.</td>
          </tr>
          <tr>
            <td>Server Response Time</td>
            <td>다른 모든 요청이 기본 문서에 종속되므로 기본 문서의 서버 응답 시간을 짧게 유지하세요.</td>
          </tr>
        </tbody>
      </BootTable>
    </>
  )
}

export default Home
