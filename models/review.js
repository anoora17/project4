const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: { type: Int, required: true },
  comment: { type: String, required: true },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager"
  }
  
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;