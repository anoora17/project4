const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  position_type: { type: String, required: true },
  resume_url: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;