const express = require("express");

const URLCtrl = require("../controllers/url-ctrl");
const ReportCtrl = require("../controllers/report-ctrl");

const router = express.Router();

router.post("/url", URLCtrl.createURL);
router.delete("/url/:id", URLCtrl.deleteURL);
router.get("/urls", URLCtrl.getURLs);

router.post("/report", ReportCtrl.insertReports);
router.get("/report/:id", ReportCtrl.getReportByProfileId);

module.exports = router;
