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
    requestedUrl: { type: String },
    finalUrl: { type: String },
    fetchTime: { type: String },
    profileId: { type: String },
    speedIndex: { type: Number },
    totalBlockingTime: { type: Number },
    firstContentfulPaint: { type: Number },
    timeToInteractive: { type: Number },
    largestContentfulPaint: { type: Number },
    cumulativeLayoutShift: { type: Number },
    unminifiedJavascript: { type: Number },
    serverResponseTime: { type: Number },
    performance: { type: Number },
    accessibility: { type: Number },
    bestPractices: { type: Number },
    seo: { type: Number },
    pwa: { type: Number },
    reportCode: { type: String },
  },
  {
    strict: false,
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

const ReportCode = new Schema(
  {
    profileId: { type: String, required: true },
    fetchTime: { type: String, required: true },
    reportCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const urlModel = mongoose.model("urls", Url)
const reportModel = mongoose.model("reports", Report) // reports: 컬랙션 지정
const LHReportModel = mongoose.model("LHReport", LHReport)
const reportCodeModel = mongoose.model("reportcodes", ReportCode)

export { urlModel, reportModel, LHReportModel, reportCodeModel }
