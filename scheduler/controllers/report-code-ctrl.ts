import { reportCodeModel as ReportCode } from "../models"

import { ReportCodeErrorMessageType, ReportCodeResolveMessageType } from "../constants/messages"

export const insertReportCode = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: ReportCodeErrorMessageType.MUST_PROVIDE_REPORT_CODE,
    })
  }
  const reportCode = new ReportCode(body)
  if (!reportCode) {
    return res.status(400).json({ success: false, error: res.err })
  }

  reportCode
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: ReportCodeResolveMessageType.REPORT_CODE_CREATED,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: ReportCodeErrorMessageType.REPORT_CODE_NOT_CREATED,
      })
    })
}
