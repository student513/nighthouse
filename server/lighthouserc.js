module.exports = {
  ci: {
    collect: {
      // startServerCommand: "cd ../client && yarn start"
      url: ["https://naver.com", "https://google.com"], // 테스트 실행할 url
      numberOfRuns: 2, // 테스트 실행 횟수
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 1 }], // performance 스코어가 minScore 이하일 시 warning
        "categories:accessibility": ["error", { minScore: 1 }], // accessibility 스코어가 minScore 이하일 시 error
      },
    },
    upload: {
      target: "temporary-public-storage", // 저장 위치 설정 가능
    },
  },
};
