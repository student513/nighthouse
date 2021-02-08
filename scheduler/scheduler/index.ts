import Agenda from "agenda"
import { promises as fs } from "fs"
import axios from "axios"
import util from "util"
import got from "got"
import dotenv from "dotenv"
dotenv.config()

import { exportProfileId, getMedianValue } from "../utils/func"
import { agendaJobName } from "../constants/agendaJobs"
import { ReportType } from "../interfaces/reportTypes"
import logger from "../utils/logger"

const exec = util.promisify(require("child_process").exec)

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
      deviceType: doc.deviceType,
    }))

    for (let url of urls) {
      await exec(
        `lhci collect --url=${url.url} --numberOfRuns=5 --settings.formFactor=${url.deviceType} --settings.screenEmulation.disabled --settings.locale=ko-KR && lhci upload --target=temporary-public-storage && lhci upload --target=filesystem --reportFilenamePattern=%%DATETIME%%-${url._id}.%%EXTENSION%% --outputDir=./reports && rm -rf ./.lighthouseci/lhr-*`
      )
        .then((message) => {
          logger.debug(message)
        })
        .catch((error) => {
          logger.debug(error)
        })

      await fs.readFile("./.lighthouseci/links.json", "utf-8").then((content) => {
        const parsedContent = JSON.parse(content)
        axios
          .post(`${process.env.SERVER_API_URL}/lhreport`, {
            profileId: url._id,
            reportLink: parsedContent[Object.keys(parsedContent)[0]],
          })
          .then((message) => logger.debug(message.data))
          .catch((error) => logger.error(error))
      })
    }
    console.log("finish Analysis", Date())
  })

  agenda.define(agendaJobName.UPLOAD_REPORT, async () => {
    console.log("start upload")
    const filenames = await fs.readdir("./reports", "utf8")
    const idCollection = {}
    filenames.map((filename) => {
      if (filename.includes(".json") && filename !== "manifest.json") {
        const profileId = exportProfileId(filename)
        const keyList = Object.keys(idCollection)
        keyList.find((key) => key === profileId)
          ? idCollection[profileId].push(filename)
          : (idCollection[profileId] = [filename])
      }
    })
    const uniqueProfileIdList = Object.keys(idCollection)
    uniqueProfileIdList.map(async (profileId) => {
      const sameProfileBuffer: any = []
      const reportLink = await axios.get(`${process.env.SERVER_API_URL}/lhreport/${profileId}`)
      const reportCode = await got(reportLink.data.data[0].reportLink)

      await Promise.all(
        idCollection[profileId].map((filename) => {
          return fs.readFile(`./reports/${filename}`, "utf-8").then((content) => {
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
                pwa: { score: pwa },
              },
            }: ReportType = report
            return sameProfileBuffer.push({
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
              pwa,
            })
          })
        })
      ) //.then((message) => logger.debug(message))
        .catch((error) => logger.debug("promise error:", error.message))

      const medianReport = getMedianValue(sameProfileBuffer)
      await axios
        .post(`${process.env.SERVER_API_URL}/report`, {
          ...medianReport,
          profileId,
          reportCode: reportCode.body,
        })
        .then((message) => logger.debug(message.data))
        .catch((error) => logger.debug("axios error:", error.message))
    })
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
    await agenda.every("26 * * * *", agendaJobName.GET_ANALYSIS)
    await agenda.every("32 * * * *", agendaJobName.UPLOAD_REPORT)
    await agenda.every("25 * * * *", agendaJobName.RESET_REPORT)
  })()
})

agenda.on("fail", (err, job) => {
  logger.debug("Job failed with error: ", err)
})

export default agenda
