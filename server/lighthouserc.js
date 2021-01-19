const axios = require("axios");
require("dotenv").config();

const urls = [];

const getUrls = async () => {
  const urlsDocuments = await axios.get(process.env.SERVER_API_URL);
  urlsDocuments.data.data.forEach((doc) => {
    urls.push(doc.url);
  });
};

getUrls().catch((err) => {
  console.error(err);
});

module.exports = {
  ci: {
    collect: {
      // startServerCommand: "cd ../client && yarn start"
      url: urls, // 테스트 실행할 url
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
