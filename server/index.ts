import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import db from "./db"
import "./scheduler"
import router from "./routes/router"

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
