import mongoose from "mongoose"

const Schema = mongoose.Schema

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
  },
  {
    strict: false,
    timestamps: true,
  }
)

export default mongoose.model("reports", Report) // reports: 컬랙션 지정
