module.exports = {
  ci: {
    collect: {
      //startServerCommand: "yarn start", // 분석 시작 시 해당 프로젝트를 빌드한다. 배포된 url이면
      url: ["https://www.naver.com"], // 테스트 실행할 url
      numberOfRuns: 1, // 테스트 실행 횟수
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 1 }], // performance 스코어가 minScore 이하일 시 warning
        "categories:accessibility": ["error", { minScore: 1 }], // accessibility 스코어가 minScore 이하일 시 error
      },
    },
    upload: {
      target: "temporary-public-storage", // 프로젝트 폴더 내에 생성됨
    },
  },
};
