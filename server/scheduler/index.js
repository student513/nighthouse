const Agenda = require("agenda");
const axios = require("axios");
const fs = require("fs");
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
      const urlsDocuments = await axios.get(
        `${process.env.SERVER_API_URL}/urls`
      );
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
    }); // ;세미콜론 없으면 에러

    agenda.define("uploadReport", (job) => {
      console.log("start upload");
      fs.readdir("./.lighthouseci", "utf8", (err, filenames) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        filenames.forEach((filename) => {
          if (filename.includes("lhr-") && filename.includes(".json")) {
            console.log(`./.lighthouseci/${filename}`);
            fs.readFile(
              `./.lighthouseci/${filename}`,
              "utf8",
              (err, content) => {
                const report = JSON.parse(content);
                const parsedReport = {
                  "speed-index": report["audits"]["speed-index"],
                  "total-blocking-time":
                    report["audits"]["total-blocking-time"],
                  "first-contentful-paint":
                    report["audits"]["first-contentful-paint"],
                  "time-to-interactive": report["audits"]["interactive"],
                  "large-contentful-paint":
                    report["audits"]["largest-contentful-paint"],
                  "cumulative-layout-shift":
                    report["audits"]["cumulative-layout-shift"],
                  "unminified-javascript":
                    report["audits"]["unminified-javascript"],
                  "server-response-time":
                    report["audits"]["server-response-time"],
                  "-performance": report["categories"]["performance"]["score"],
                  "-accessibility":
                    report["categories"]["accessibility"]["score"],
                  "-best-practices":
                    report["categories"]["best-practices"]["score"],
                  "-seo": report["categories"]["seo"]["score"],
                };
                axios.post(
                  `${process.env.SERVER_API_URL}/report`,
                  parsedReport
                );
                console.log(parsedReport);
              }
            );
          }
        });
      });
    }); // ;세미콜론 없으면 에러

    (async () => {
      await agenda.start();
      await agenda.every("2 minutes", "getAnalysis");
      await agenda.every("2 minutes", "uploadReport");
    })();
  });
} catch {
  (err) => {
    console.error(err);
    process.exit(-1);
  };
}

module.exports = agenda;
