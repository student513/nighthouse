import express from "express"

import { createURL, deleteURL, getURLs } from "../controllers/url-ctrl"
import { getReports } from "../controllers/report-ctrl"

const router = express.Router()

router.post("/url", createURL)
router.delete("/url/:id", deleteURL)
router.get("/urls", getURLs)

router.get("/report/:profileId", getReports)

export default router
