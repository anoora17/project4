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
  resume_url: { type: String, required: true },
  resume_text: { type: String, required: true },
  resume: { type: String, required: false},
  date: { type: Date, default: Date.now },
  review: [{
    type: Schema.Types.ObjectId,
    ref: "review"
  }]
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;