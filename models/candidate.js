const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  position_type: { type: String },
  resume_url: { type: String },
  resume_text: { type: String },
  resume: { type: String },
  date: { type: Date, default: Date.now }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
