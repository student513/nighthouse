const Agenda = require("agenda");
const axios = require("axios");

const agenda = new Agenda({
  db: {
    address: "localhost:27017/nighthouse",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "jobs", // 어느 컬랙션에 job 정보를 관리할 것인가?
  },
  processEvery: "10 seconds",
});
// urls에서 url을 가져오므로 여기서 lighthouserc.js에 파라미터 패싱이 일어나야겠다.
// 생성된 json을 db에 저장까지 가능할까?

try {
  agenda.on("ready", async () => {
    console.log("Success agenda connecting");
    agenda.define("getUrls", async (job) => {
      console.log("getUrls 시작");
      const urlsDocuments = await axios.get("http://localhost:3001/api/urls");
      const urls = [];
      urlsDocuments.data.data.forEach((doc) => {
        urls.push(doc.url);
      });
    });

    (async () => {
      await agenda.start();
      await agenda.every("5 minutes", "getUrls");
    })();
  });
} catch {
  (err) => {
    console.error(err);
    process.exit(-1);
  };
}

module.exports = agenda;
