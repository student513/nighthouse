import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })
const db = mongoose.connection
export default db
