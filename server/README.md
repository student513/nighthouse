## feature

---

- yarn
- node: 12.16.1v
- mongoDB mongoose
- express
- typescript
- agenda: schduler
- file system: 프로젝트 내 디렉토리의 파일에 접근하여, 내용을 버퍼로 가져온다거나 목록을 가져올 수 있음.
- child_process: js로 CLI 입력 가능

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

---

- lighthouse-ci는 터미널 명령 `lhci autorun`으로 `lighthouserc.js`의 설정값을 참고하여 리포트를 json파일로 생성합니다. 터미널 명령은 child-process로 실행됩니다.
- 생성된 파일은 file system을 이용하여 데이터를 가져와 mongoDB에 저장합니다.

- scheduler/index.ts에서 agenda 스케줄러가 3개의 job을 실행합니다.
  - GET_ANALYSIS: lighthouse-ci로 프로파일 url에 대한 리포트를 로컬 디렉토리에 생성합니다.
  - UPLOAD_REPORT: 생성된 리포트의 주요지표를 파싱하여 mongoDB에 저장합니다.
  - RESET_REPORT: 로컬디렉토리에 생성된 리포트를 초기화합니다.

## 디렉토리 구조

---

- constants: enum 상수 모음
- controllers: mongoose 컨트롤러 모음
- models: mongoose 모델 모음
- routes: mongoose 라우터 모음
- db: mongo 디비 연결
- interface: 인터페이스 모음
- scheduler: agenda 스케줄러와 실행될 job이 정의되어있음
- utils: 비즈니스 로직에 도움이 되는 기타 함수들이 정의되어있음
