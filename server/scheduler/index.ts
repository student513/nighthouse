export = {}
const Agenda = require("agenda")
const exec = require("child_process").exec
const fs = require("fs").promises
const axios = require("axios")

const util = require("./util")
const Job = require("../interfaces/agendaJobs")

const agenda = new Agenda({
  db: {
    address: process.env.DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "jobs",
  },
  processEvery: "10 seconds",
})

agenda.on("ready", async () => {
  console.log("Success agenda connecting")
  agenda.define(Job.agendaJobName.GET_ANALYSIS, async () => {
    console.log("start Analysis")
    const urlsDocuments = await axios.get(`${process.env.SERVER_API_URL}/urls`)
    const urls = urlsDocuments.data.data.map((doc) => ({
      url: doc.url,
      _id: doc._id,
    }))

    urls.forEach((url) => {
      const lhciCollect = exec(
        `lhci collect --url=${url.url} && lhci upload --target=filesystem --reportFilenamePattern=%%DATETIME%%-${url._id}.%%EXTENSION%% --outputDir=./reports `
      )
      lhciCollect.stdout.on("data", function (message) {
        console.log(message)
      })
    })
    console.log("finish Analysis", Date())
  })
  agenda.define(Job.agendaJobName.UPLOAD_REPORT, async () => {
    console.log("start upload")
    const filenames = await fs.readdir("./reports", "utf8")
    await Promise.all(
      filenames.map((filename) => {
        if (filename.includes(".json") && filename !== "manifest.json") {
          fs.readFile(`./reports/${filename}`, "utf8").then(async (content) => {
            const report = JSON.parse(content)
            const {
              requestedUrl,
              finalUrl,
              audits: {
                "speed-index": speedIndex,
                "total-blocking-time": totalBlockingTime,
                "first-contentful-paint": firstContentfulPaint,
                interactive: timeToInteractive,
                "largest-contentful-paint": largeContentfulPaint,
                "cumulative-layout-shift": cumulativeLayoutShift,
                "unminified-javascript": unminifiedJavascript,
                "server-response-time": serverResponseTime,
              },
            } = report

            await axios.post(`${process.env.SERVER_API_URL}/report`, {
              profileId: util.exportProfileId(filename),
              requestedUrl,
              finalUrl,
              speedIndex,
              totalBlockingTime,
              firstContentfulPaint,
              timeToInteractive,
              largeContentfulPaint,
              cumulativeLayoutShift,
              unminifiedJavascript,
              serverResponseTime,
              performance: report["categories"]["performance"]["score"],
              accessibility: report["categories"]["accessibility"]["score"],
              bestPractices: report["categories"]["best-practices"]["score"],
              seo: report["categories"]["seo"]["score"],
            })
          })
        }
      })
    )
    console.log("finish upload", Date())
  })
  agenda.define(Job.agendaJobName.RESET_REPORT, () => {
    const reset = exec(`rm -rf ./reports ./.lighthouseci && mkdir reports .lighthouseci`)
    reset.stdout.on("data", function (message) {
      console.log(message)
    })
  })
  ;(async () => {
    await agenda.start()
    await agenda.every("52 * * * *", Job.agendaJobName.GET_ANALYSIS)
    await agenda.every("13 * * * *", Job.agendaJobName.UPLOAD_REPORT)
    await agenda.every("58 * * * *", Job.agendaJobName.RESET_REPORT)
  })()
})

agenda.on("fail", (err, job) => {
  console.log(`Job failed with error: ${err.message}`)
})

module.exports = agenda
