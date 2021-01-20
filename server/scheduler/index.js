const Agenda = require("agenda");
const axios = require("axios");
const exec = require("child_process").exec;

require("dotenv").config();

const agenda = new Agenda({
  db: {
    address: process.env.DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "jobs", // 어느 컬랙션에 job 정보를 관리할 것인가?
  },
  processEvery: "10 seconds",
});

try {
  agenda.on("ready", async () => {
    console.log("Success agenda connecting");
    agenda.define("getAnalysis", async (job) => {
      console.log("start Analysis");
      const urlsDocuments = await axios.get(process.env.SERVER_API_URL);
      const urls = [];
      urlsDocuments.data.data.forEach((doc) => {
        urls.push(doc.url);
      });

      urls.forEach((url) => {
        const lhci = exec(`lhci collect --url=${url}`);
        lhci.stdout.on("data", function (message) {
          console.log(message);
        });
      });
    });

    (async () => {
      await agenda.start();
      await agenda.every("2 minutes", "getAnalysis");
    })();
  });
} catch {
  (err) => {
    console.error(err);
    process.exit(-1);
  };
}

module.exports = agenda;
