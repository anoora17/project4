const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipcode: { type: String, required: false },
  position_type: { type: String, required: true },
  resume_url: { type: String },
  resume_text: { type: String },
  resume: { type: String},
  date: { type: Date, default: Date.now }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;