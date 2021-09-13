## nighthouse

https://user-images.githubusercontent.com/50268619/133109030-1deac175-e4c9-4c41-991b-1bce83c9043e.mov

## 서비스 설명

원하는 특정 시간대의 웹 페이지 성능측정을 자동화하여 서버에 lighthouse의 성능 측정 리포트를 저장하고 시계열로 조회할 수 있는 시스템입니다.

lighthouse-ci, React.js, Typescript, Express, MongoDB를 이용하여 개발했으며, Agenda 스케줄러를 이용하여 매 시간 성능분석을 실시합니다. 서비스 특성상 차트를 이용한 데이터 조회가 잦기 때문에 DOM 업데이트 최적화를 도와줄 React.js를 이용했습니다. 디버깅을 용이하게 할 정적 타입핑 툴로는, 안정성과 생산성의 적절한 trade-off를 이룬 Typescript를 채택했습니다. 또한 데이터베이스에는 MongoDB를 선택하여 JSON 형태로 제공되는 lighthouse 성능 데이터의 관리 용이성을 증가시켰고, 유연한 스키마로 이용자 수요에 따라 측정할 성능 데이터를 추가/제거가 용이하도록 하였습니다.

웹 서비스 특성 상 네트워크 환경에 따라 성능 스코어가 요동칠 수 있기 때문에, 안정성을 위한 중앙값 처리 알고리즘을 구현하였습니다. 또한 성능스코어를 저장하는 과정에서 렌더링 성능을 고려한 차트 데이터 가공 알고리즘을 구현하였습니다.

## 디렉토리 구조

- [server](./server/README.md)
- [client](./client/README.md)
- [scheduler](./scheduler/README.md)

## 이용방법

1. Create Analysis에서 프로파일을 생성합니다.
2. 매 시간마다 프로파일의 url이 lighthouse ci로 분석되어 리포트 결과를 생성합니다.
3. Analysis List에서 각 프로파일의 분석결과를 확인할 수 있습니다.

## Development Build

- 클라이언트 실행
  `$ cd client && yarn start`

- 서버 실행
  `$ cd server && yarn server`

- 스케줄러 실행
  `$ cd scheduler && yarn server`

## Production Build

## setting

- 크롬 설치: `$ wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \ && yum -y install google-chrome*.rpm`
- lighthouse-ci 설치: `$ npm install -g @lhci/cli`

### server 실행

1. ssh 로그인
2. `$ kinit`
3. `$ rlogin -l irteamsu dev-hyeongjunjo-ncl`
4. `$ cd nighthouse`
5. `$ nohup ./client.sh & nohup ./server.sh & nohup ./scheduler.sh &`

### Command

- 실행중인 프로세스:
  `ps -ef | grep irteamsu`
- 프로세스 종료
  `$ kill -9 {PID}`

### db 세팅

1. mongodb 설치 후 `nighthouse` 데이터베이스 생성
2. collection `urls`, `reports`, `LHReport`, `reportcodes` 생성
