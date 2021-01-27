import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose
  .connect("mongodb://127.0.0.1:27017/nighthouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })
const db = mongoose.connection
export default db
