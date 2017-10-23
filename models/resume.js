const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  resumeText: { type: String }
});

const Candidate = mongoose.model("Resume", resumeSchema);

module.exports = Resume;