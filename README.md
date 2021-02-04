## nighthouse

### 서비스 설명

lighthouse ci로 분석한 리포트의 주요지표를 시계열로 확인할 수 있는 서비스입니다.

### 디렉토리 구조

- [server](./server/README.md)
- [client](./client/README.md)

### 빌드

- 클라이언트 실행
  `cd client && yarn start`

- 서버 실행
  `cd server && yarn server`

### 실행방법

1. Create Analysis에서 프로파일을 생성합니다.
2. 매 시간마다 프로파일의 url이 lighthouse ci로 분석되어 리포트 결과를 생성합니다.
3. Analysis List에서 각 프로파일의 분석결과를 확인할 수 있습니다.
