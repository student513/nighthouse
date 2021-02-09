import express from "express"

import { insertReports } from "../controllers/report-ctrl"
import { insertLHReport, getLatestLHReport } from "../controllers/lhreport-ctrl"
import { getURLs } from "../controllers/url-ctrl"
const router = express.Router()

router.post("/report", insertReports)
router.post("/lhreport", insertLHReport)
router.get("/urls", getURLs)
router.get("/lhreport/:profileId", getLatestLHReport)

export default router
