const axios = require("axios");
const exec = require("child_process").exec;
const fs = require("fs");

require("dotenv").config();

const exportProfileId = (filename) => {
  const tmp = filename.split("-");
  const id = tmp[1].split(".");
  return id[0];
};

const getAnalysis = async () => {
  console.log("start Analysis");
  const urlsDocuments = await axios.get(`${process.env.SERVER_API_URL}/urls`);
  const urls = [];
  // urls: [{url, _id}]
  urlsDocuments.data.data.forEach((doc) => {
    urls.push({ url: doc.url, _id: doc._id });
  });

  // {url, _id}마다 lhci collect커맨드 실행
  urls.forEach((url) => {
    // url마다 분석 실시
    const lhciCollect = exec(
      `lhci collect --url=${url.url} && lhci upload --target=filesystem --reportFilenamePattern=%%DATETIME%%-${url._id}.%%EXTENSION%% --outputDir=./reports `
    );
    lhciCollect.stdout.on("data", function (message) {
      console.log(message);
    });
  });
};

const uploadReport = () => {
  console.log("start upload");

  // reports 폴더의 모든 파일에 대하여
  fs.readdir("./reports", "utf8", (err, filenames) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    // 해당파일의 확장자가 .json이면
    filenames.forEach((filename) => {
      if (filename.includes(".json") && filename !== "manifest.json") {
        // 해당 파일에 대해 filename을 삽입하여 파싱
        fs.readFile(
          `./reports/${filename}`, // filename에 _id를 넣고 filename을 json에 삽입
          "utf8",
          (err, content) => {
            const report = JSON.parse(content);
            const parsedReport = {
              "profileId": exportProfileId(filename),
              "speedIndex": report["audits"]["speed-index"],
              "totalBlockingTime": report["audits"]["total-blocking-time"],
              "firstContentfulPaint":
                report["audits"]["first-contentful-paint"],
              "timeToInteractive": report["audits"]["interactive"],
              "largeContentfulPaint":
                report["audits"]["largest-contentful-paint"],
              "cumulativeLayoutShift":
                report["audits"]["cumulative-layout-shift"],
              "unminifiedJavascript":
                report["audits"]["unminified-javascript"],
              "serverResponseTime": report["audits"]["server-response-time"],
              "performance": report["categories"]["performance"]["score"],
              "accessibility": report["categories"]["accessibility"]["score"],
              "bestPractices":
                report["categories"]["best-practices"]["score"],
              "seo": report["categories"]["seo"]["score"],
            };
            axios.post(`${process.env.SERVER_API_URL}/report`, parsedReport);
          }
        );
      }
    });
  });
};

const resetReport = () => {
  const reset = exec(`rm -rf ./reports && mkdir reports`);
  reset.stdout.on("data", function (message) {
    console.log(message);
  });
};

module.exports = { getAnalysis, uploadReport, resetReport };
