const Agenda = require("agenda");
const axios = require("axios");
const fs = require("fs");
const exec = require("child_process").exec;

const job = require("./job.js");

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

    agenda.define("getAnalysis", job.getAnalysis()); // ;세미콜론 없으면 에러
    agenda.define("uploadReport", job.uploadReport()); // ;세미콜론 없으면 에러

    (async () => {
      await agenda.start();
      await agenda.every("4 minutes", "getAnalysis");
      await agenda.every("7 minutes", "uploadReport");
    })();
  });
} catch {
  (err) => {
    console.error(err);
    process.exit(-1);
  };
}

module.exports = agenda;
