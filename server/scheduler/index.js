const Agenda = require("agenda");
const exec = require("child_process").exec;
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const exportProfileId = (filename) => {
  const tmp = filename.split("-");
  const id = tmp[1].split(".");
  return id[0];
};

const agenda = new Agenda({
  db: {
    address: process.env.DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "jobs",
  },
  processEvery: "10 seconds",
});

try {
  agenda.on("ready", async () => {
    console.log("Success agenda connecting");

    agenda.define("getAnalysis", async () => {
      console.log("start Analysis");
      const urlsDocuments = await axios.get(`${process.env.SERVER_API_URL}/urls`);
      const urls = [];
      urlsDocuments.data.data.forEach((doc) => {
        urls.push({ url: doc.url, _id: doc._id });
      });

      urls.forEach((url) => {
        const lhciCollect = exec(`lhci collect --url=${url.url} && lhci upload --target=filesystem --reportFilenamePattern=%%DATETIME%%-${url._id}.%%EXTENSION%% --outputDir=./reports `);
        lhciCollect.stdout.on("data", function (message) {
          console.log(message);
        });
      });
      console.log("finish Analysis", Date());
    });
    agenda.define("uploadReport", () => {
      console.log("start upload");
      fs.readdir("./reports", "utf8", (err, filenames) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        filenames.forEach((filename) => {
          if (filename.includes(".json") && filename !== "manifest.json") {
            fs.readFile(`./reports/${filename}`, "utf8", (err, content) => {
              const report = JSON.parse(content);
              const parsedReport = {
                profileId: exportProfileId(filename),
                speedIndex: report["audits"]["speed-index"],
                totalBlockingTime: report["audits"]["total-blocking-time"],
                firstContentfulPaint: report["audits"]["first-contentful-paint"],
                timeToInteractive: report["audits"]["interactive"],
                largeContentfulPaint: report["audits"]["largest-contentful-paint"],
                cumulativeLayoutShift: report["audits"]["cumulative-layout-shift"],
                unminifiedJavascript: report["audits"]["unminified-javascript"],
                serverResponseTime: report["audits"]["server-response-time"],
                performance: report["categories"]["performance"]["score"],
                accessibility: report["categories"]["accessibility"]["score"],
                bestPractices: report["categories"]["best-practices"]["score"],
                seo: report["categories"]["seo"]["score"],
              };
              axios.post(`${process.env.SERVER_API_URL}/report`, parsedReport);
            });
          }
        });
      });
      console.log("finish upload", Date());
    }); // ;세미콜론 없으면 에러
    agenda.define("resetReport", () => {
      const reset = exec(`rm -rf ./reports && mkdir reports`);
      reset.stdout.on("data", function (message) {
        console.log(message);
      });
    });

    (async () => {
      await agenda.start();
      await agenda.every("3 minutes", "getAnalysis");
      await agenda.every("15 minutes", "uploadReport");
      await agenda.every("7 minutes", "resetReport");
    })();
  });
} catch {
  (err) => {
    console.error(err);
    process.exit(-1);
  };
}

module.exports = agenda;
