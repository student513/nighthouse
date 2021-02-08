import { reportModel as Report } from "../models"

import { ReportErrorMessageType, ReportResolveMessageType } from "../constants/messages"

export const insertReports = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: ReportErrorMessageType.MUST_PROVIDE_REPORT,
    })
  }
  const report = new Report(body)
  if (!report) {
    return res.status(400).json({ success: false, error: res.err })
  }

  report
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: ReportResolveMessageType.REPORT_SAVED,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: ReportErrorMessageType.REPORT_NOT_SAVED,
      })
    })
}
