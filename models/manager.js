const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
  
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;