import Url from "../models/url-model"
import logger from "../utils/logger"
import { UrlErrorMessageType, UrlResolveMessageType } from "../constants/messages"

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

export const deleteURL = (req, res) => {
  Url.findOneAndDelete({ _id: req.params.id })
    .then((url) => {
      return url
        ? res.status(200).json({ success: true, data: url })
        : res.status(404).json({ success: false, error: UrlErrorMessageType.URL_NOT_FOUND })
    })
    .catch((err) => logger.debug(err))
}

export const getURLs = (req, res) => {
  Url.find({})
    .then((urls) => {
      if (!urls.length) {
        return res.status(404).json({ success: false, error: UrlErrorMessageType.URL_NOT_FOUND })
      }
      return res.status(200).json({ success: true, data: urls })
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error })
    })
}
