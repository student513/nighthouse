const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const db = require("./db")
const agenda = require("./scheduler")
const router = require("./routes/router")

const app = express()
const apiPort = 3001

app
  .use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
  .use(bodyParser.json({ limit: "50mb" }))
  .use(cors())

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app
  .get("/", (req, res) => {
    res.send("Hello World!")
  })
  .use("/api", router)
  .listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
