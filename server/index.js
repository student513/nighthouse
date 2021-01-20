const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const spawn = require("child_process").exec;

const db = require("./db");
const urlRouter = require("./routes/url-router");
const agenda = require("./scheduler");
const { cwd } = require("process");

const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", urlRouter);

const lhci = spawn("lhci autorun", []);
lhci.stdout.on("data");

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
