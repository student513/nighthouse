import Report from "../models/report-model"

export const insertReports = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Report",
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
        message: "Report saved!",
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Report not saved!",
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
