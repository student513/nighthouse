import express from "express"

import { createURL, deleteURL, getURLs } from "../controllers/url-ctrl"
import { getReportCode } from "../controllers/report-code-ctrl"
import { getReports, getLatestReport } from "../controllers/report-ctrl"

const router = express.Router()

router.post("/url", createURL)
router.delete("/url/:id", deleteURL)
router.get("/urls", getURLs)

router.get("/report/:profileId", getReports)
router.get("/report/latest/:profileId", getLatestReport)

router.get("/reportcode/:profileId/:fetchTime", getReportCode)

export default router
