import { urlModel as Url } from "../models"

import { UrlErrorMessageType } from "../constants/messages"

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
