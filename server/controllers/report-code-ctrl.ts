import { reportCodeModel as ReportCode } from "../models"

import { ReportCodeErrorMessageType } from "../constants/messages"

export const getReportCode = async (req, res) => {
  try {
    const reportCode = await ReportCode.find({
      profileId: req.params.profileId,
      fetchTime: req.params.fetchTime,
    })
    if (!reportCode.length) {
      return res.status(204).json({ success: false, error: ReportCodeErrorMessageType.REPORT_CODE_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: reportCode })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
