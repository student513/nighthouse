const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URL = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("urls", URL);
