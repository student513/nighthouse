import { reportModel as Report } from "../models"

import { ReportErrorMessageType, ReportResolveMessageType } from "../constants/messages"

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ profileId: { $in: req.params.profileId } })
    if (!reports.length) {
      return res.status(204).json({ success: false, error: ReportErrorMessageType.REPORT_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: reports })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getLatestReport = async (req, res) => {
  try {
    const latestCreatedReport = await Report.find({ profileId: { $in: req.params.profileId } })
      .sort({ _id: -1 })
      .limit(1)
    if (!latestCreatedReport.length) {
      return res.status(204).json({ success: false, error: ReportErrorMessageType.REPORT_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: latestCreatedReport })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
