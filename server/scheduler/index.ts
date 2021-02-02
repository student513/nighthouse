import Agenda from "agenda"
import { exec } from "child_process"
import { promises as fs } from "fs"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

import { exportProfileId } from "../utils/func"
import { agendaJobName } from "../constants/agendaJobs"
import { ReportType } from "../interfaces/reportTypes"
import logger from "../utils/logger"

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
  agenda.define(agendaJobName.GET_ANALYSIS, async () => {
    console.log("start Analysis")
    const urlsDocuments = await axios.get(`${process.env.SERVER_API_URL}/urls`)
    const urls = urlsDocuments.data.data.map((doc) => ({
      url: doc.url,
      _id: doc._id,
    }))

    urls.forEach((url) => {
      const lhciCollect = exec(
        `lhci collect --url=${url.url} && lhci upload --target=filesystem --reportFilenamePattern=%%DATETIME%%-${url._id}.%%EXTENSION%% --outputDir=./reports`,
        (error, stdout, stderr) => {
          logger.debug("exec log: ", stdout)
          if (error !== null) {
            logger.debug("exec error: ", error)
          }
        }
      )
    })
    console.log("finish Analysis", Date())
  })
  agenda.define(agendaJobName.UPLOAD_REPORT, async () => {
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
              fetchTime,
              audits: {
                "speed-index": { numericValue: speedIndex },
                "total-blocking-time": { numericValue: totalBlockingTime },
                "first-contentful-paint": { numericValue: firstContentfulPaint },
                interactive: { numericValue: timeToInteractive },
                "largest-contentful-paint": { numericValue: largestContentfulPaint },
                "cumulative-layout-shift": { numericValue: cumulativeLayoutShift },
                "unminified-javascript": { numericValue: unminifiedJavascript },
                "server-response-time": { numericValue: serverResponseTime },
              },
              categories: {
                performance: { score: performance },
                accessibility: { score: accessibility },
                "best-practices": { score: bestPractices },
                seo: { score: seo },
              },
            }: ReportType = report

            await axios.post(`${process.env.SERVER_API_URL}/report`, {
              profileId: exportProfileId(filename),
              requestedUrl,
              finalUrl,
              fetchTime,
              speedIndex,
              totalBlockingTime,
              firstContentfulPaint,
              timeToInteractive,
              largestContentfulPaint,
              cumulativeLayoutShift,
              unminifiedJavascript,
              serverResponseTime,
              performance,
              accessibility,
              bestPractices,
              seo,
            })
          })
        }
      })
    )
    console.log("finish upload", Date())
  })
  agenda.define(agendaJobName.RESET_REPORT, () => {
    const reset = exec(`rm -rf ./reports ./.lighthouseci && mkdir reports .lighthouseci`, (error, stdout, stderr) => {
      console.log(stdout)
      if (error !== null) {
        logger.debug("exec error: ", error)
      }
    })
  })
  ;(async () => {
    await agenda.start()
    await agenda.every("00 * * * *", agendaJobName.GET_ANALYSIS)
    await agenda.every("25 * * * *", agendaJobName.UPLOAD_REPORT)
    await agenda.every("58 * * * *", agendaJobName.RESET_REPORT)
  })()
})

agenda.on("fail", (err, job) => {
  logger.debug("Job failed with error: ", err)
})

export default agenda
