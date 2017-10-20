const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  fullname: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Jobreq"
  }
  
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;