import Report from "../models/report-model"
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

// getReportByProfileId = async (req, res) => {
//   await Report.find({ profileId: req.params.profileId }, (err, report) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }
//     if (!report) {
//       return res
//         .status(404)
//         .json({ success: false, error: `Report not found` });
//     }
//     return res.status(200).json({ success: true, data: report });
//   });
// };
