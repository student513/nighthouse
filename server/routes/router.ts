import express from "express"

import { createURL, deleteURL, getURLs } from "../controllers/url-ctrl"
import { insertReports, getReports } from "../controllers/report-ctrl"

const router = express.Router()

router.post("/url", createURL)
router.delete("/url/:id", deleteURL)
router.get("/urls", getURLs)

router.post("/report", insertReports)
router.get("/report/:profileId", getReports)

// router.get("/report/:id/:reportId", ReportCtrl.getReportByProfileId);

export default router
