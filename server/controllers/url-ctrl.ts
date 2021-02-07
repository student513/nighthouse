import { urlModel as Url, reportModel as Report, LHReportModel as LHReport } from "../models"

import {
  LHReportErrorMessageType,
  ReportErrorMessageType,
  UrlErrorMessageType,
  UrlResolveMessageType,
} from "../constants/messages"

export const createURL = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: UrlErrorMessageType.MUST_PROVIDE_URL,
    })
  }
  const url = new Url(body)
  if (!url) {
    return res.status(400).json({ success: false, error: res.err })
  }

  url
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: url._id,
        message: UrlResolveMessageType.URL_CREATED,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: UrlErrorMessageType.URL_NOT_CREATED,
      })
    })
}

export const deleteURL = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ _id: req.params.id })
    if (!url) return res.status(404).json({ success: false, error: UrlErrorMessageType.URL_NOT_FOUND })
    const report = await Report.deleteMany({ profileId: req.params.id })
    const lhReport = await LHReport.deleteMany({ profileId: req.params.id })

    return res.status(200).json({ success: true, data: { url, report, lhReport } })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getURLs = async (req, res) => {
  try {
    const urls = await Url.find({})
    if (!urls.length) {
      return res.status(404).json({ success: false, error: UrlErrorMessageType.URL_NOT_FOUND })
    }
    return res.status(200).json({ success: true, data: urls })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
