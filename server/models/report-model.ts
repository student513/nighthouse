import mongoose from "mongoose"

const Schema = mongoose.Schema

const Report = new Schema(
  {
    profileId: { type: String },
  },
  {
    strict: false,
    timestamps: true,
  }
)

export default mongoose.model("reports", Report) // reports: 컬랙션 지정
