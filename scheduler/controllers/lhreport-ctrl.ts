import { LHReportModel as LHReport } from "../models"

import { LHReportErrorMessageType, LHReportResolveMessageType } from "../constants/messages"

export const insertLHReport = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: LHReportErrorMessageType.MUST_PROVIDE_LHREPORT,
    })
  }
  const lhReport = new LHReport(body)
  if (!lhReport) {
    return res.status(400).json({ success: false, error: res.err })
  }

  lhReport
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: lhReport._id,
        message: LHReportResolveMessageType.LHREPORT_CREATED,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: LHReportErrorMessageType.LHREPORT_NOT_CREATED,
      })
    })
}

export const getLatestLHReport = async (req, res) => {
  try {
    const lhReport = await LHReport.find({ profileId: { $in: req.params.profileId } })
      .sort({ _id: -1 })
      .limit(1)
    if (!lhReport) {
      return res.status(404).json({ success: false, error: LHReportErrorMessageType.LHREPORT_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: lhReport })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
