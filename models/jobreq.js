const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobreqSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number },
  reqskills: { type: String, required: true }  
});

const Jobreq = mongoose.model("Jobreq", jobreqSchema);

module.exports = Jobreq;