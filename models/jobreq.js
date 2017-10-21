const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobreqSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String },
  reqskills: { type: String, required: true },
  mgrid: {
    type: Schema.Types.ObjectId,
    ref: "Manager"
  }
  
});

const Jobreq = mongoose.model("Jobreq", jobreqSchema);

module.exports = Jobreq;