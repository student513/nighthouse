import { reportModel as Report } from "../models"

import { ReportErrorMessageType, ReportResolveMessageType } from "../constants/messages"

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ profileId: { $in: req.params.profileId } })
    if (!reports.length) {
      return res.status(404).json({ success: false, error: ReportErrorMessageType.REPORT_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: reports })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
