const Agenda = require("agenda");
const exec = require("child_process").exec;
const fs = require("fs");
const axios = require("axios");

const { exportProfileId } = require("./util");

const agenda = new Agenda({
  db: {
    address: process.env.DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "jobs",
  },
  processEvery: "10 seconds",
});

agenda.on("ready", async () => {
  console.log("Success agenda connecting");
  agenda.define("getAnalysis", async () => {
    console.log("start Analysis");
    const urlsDocuments = await axios.get(`${process.env.SERVER_API_URL}/urls`);
    const urls = urlsDocuments.data.data.map((doc) => ({
      url: doc.url,
      _id: doc._id,
    }));

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
      console.log(filenames);
      filenames.forEach((filename) => {
        if (filename.includes(".json") && filename !== "manifest.json") {
          fs.readFile(`./reports/${filename}`, "utf8", async (err, content) => {
            const report = JSON.parse(content);
            const parsedReport = {
              profileId: exportProfileId(filename),
              requestedUrl: report["requestedUrl"],
              finalUrl: report["finalUrl"],
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
            await axios.post(`${process.env.SERVER_API_URL}/report`, parsedReport);
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
    await agenda.every("00 * * * *", "getAnalysis");
    await agenda.every("10 * * * *", "uploadReport");
    await agenda.every("58 * * * *", "resetReport");
  })();
});

agenda.on("fail", (err, job) => {
  console.log(`Job failed with error: ${err.message}`);
});

module.exports = agenda;
