## feature

---

- yarn
- node: 12.16.1v
- mongoDB mongoose
- express
- typescript

## Installing

---

### yarn 설치

`$ npm install yarn -g`

### npm 버전관리

`$ nvm use 12.16.1`

### download depandencies

`$ yarn`

### Command

- server start
  `$ yarn server`

## 메커니즘

- nighthouse의 CRUD 서버입니다.
- 클라이언트와 연동되어 api를 수행합니다
  - createURL: 성능 측정을 원하는 url을 db에 저장합니다.
  - deleteURL: 분석 대상으로 등록된 url과 생성된 관련 리포트를 db에서 모두 삭제합니다.
  - getURLs: 생성된 모든 프로파일의 url을 조회합니다.
  - getReports: 해당 url로 생성된 모든 리포트를 조회합니다.

## 디렉토리 구조

- constants: enum 상수 모음
- controllers: mongoose 컨트롤러 모음
- models: mongoose 모델 모음
- routes: mongoose 라우터 모음
- db: mongo 디비 연결
- interface: 인터페이스 모음
- utils: 비즈니스 로직에 도움이 되는 기타 함수들이 정의되어있음
