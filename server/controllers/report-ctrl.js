const Report = require("../models/report-model");

insertReports = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Report",
    });
  }
  const report = new Report(body);
  if (!report) {
    return res.status(400).json({ success: false, error: err });
  }

  report
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Report saved!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Report not saved!",
      });
    });
};

// getReportById = async (req, res) => {
//   await Report.find({}, (err, report));
// };

module.exports = {
  insertReports,
};
