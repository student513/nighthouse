import mongoose from "mongoose"

const Schema = mongoose.Schema

const Url = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("urls", Url)
