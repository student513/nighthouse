const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({ temp: String }, { strict: false }); //빈 부분

module.exports = mongoose.model("reports", Report); // reports: 컬랙션 지정
