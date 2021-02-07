import mongoose from "mongoose"

const Schema = mongoose.Schema

const Url = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    deviceType: { type: String, required: true },
  },
  { timestamps: true }
)

const Report = new Schema(
  {
    requestedUrl: { type: String, required: true },
    finalUrl: { type: String, required: true },
    fetchTime: { type: String, required: true },
    profileId: { type: String, required: true },
    speedIndex: { type: Number, required: true },
    totalBlockingTime: { type: Number, required: true },
    firstContentfulPaint: { type: Number, required: true },
    timeToInteractive: { type: Number, required: true },
    largestContentfulPaint: { type: Number, required: true },
    cumulativeLayoutShift: { type: Number, required: true },
    unminifiedJavascript: { type: Number, required: true },
    serverResponseTime: { type: Number, required: true },
    performance: { type: Number, required: true },
    accessibility: { type: Number, required: true },
    bestPractices: { type: Number, required: true },
    seo: { type: Number, required: true },
    pwa: { type: Number, required: true },
    reportCode: { type: String },
  },
  {
    timestamps: true,
  }
)

const LHReport = new Schema(
  {
    profileId: { type: String, required: true },
    reportLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const urlModel = mongoose.model("urls", Url)
const reportModel = mongoose.model("reports", Report) // reports: 컬랙션 지정
const LHReportModel = mongoose.model("LHReport", LHReport)

export { urlModel, reportModel, LHReportModel }
