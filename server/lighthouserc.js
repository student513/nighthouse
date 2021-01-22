module.exports = {
  ci: {
    collect: {

      numberOfRuns: 1, // 테스트 실행 횟수
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 1 }], // performance 스코어가 minScore 이하일 시 warning
        "categories:accessibility": ["error", { minScore: 1 }], // accessibility 스코어가 minScore 이하일 시 error
      },
    },
    upload: {

    },
  },
};
