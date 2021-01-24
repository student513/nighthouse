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

getReports = async (req, res) => {
  await Report.find({ profileId: { $in: req.params.profileId } }, (err, report) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!report.length) {
      return res.status(404).json({ success: false, error: `Report not found` });
    }
    return res.status(200).json({ success: true, data: report });
  }).catch((err) => console.log(err));
};

module.exports = {
  insertReports,
  getReports,
};
