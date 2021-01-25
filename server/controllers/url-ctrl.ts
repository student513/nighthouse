const Url = require("../models/url-model")

const createURL = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a URL",
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
        message: "URL created!",
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "URL not created!",
      })
    })
}

const deleteURL = async (req, res) => {
  await Url.findOneAndDelete({ _id: req.params.id }, (err, url) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!url) {
      return res.status(404).json({ success: false, error: `url not found` })
    }

    return res.status(200).json({ success: true, data: url })
  }).catch((err) => console.log(err))
}

const getURLs = async (req, res) => {
  await Url.find({}, (err, urls) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!urls.length) {
      return res.status(404).json({ success: false, error: `Url not found` })
    }
    return res.status(200).json({ success: true, data: urls })
  }).catch((err) => console.log(err))
}

module.exports = {
  createURL,
  deleteURL,
  getURLs,
}
