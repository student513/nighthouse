const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema(
  {
    profileId: { type: String, required: true },
    requestedUrl: { type: String, required: true },
    finalUrl: { type: String, required: true },
    speedIndex: { type: String, required: true },
    totalBlockingTime: { type: String, required: true },
    firstContentfulPaint: { type: String, required: true },
    timeToInteractive: { type: String, required: true },
    largeContentfulPaint: { type: String, required: true },
    cumulativeLayoutShift: { type: String, required: true },
    unminifiedJavascript: { type: String, required: true },
    serverResponseTime: { type: String, required: true },
    performance: { type: String, required: true },
    accessibility: { type: String, required: true },
    bestPractices: { type: String, required: true },
    seo: { type: String, required: true },
  },
  {
    strict: false,
  },
  { timestamps: true }
); //빈 부분

module.exports = mongoose.model("reports", Report); // reports: 컬랙션 지정
