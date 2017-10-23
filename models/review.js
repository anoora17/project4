const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: { type: String, required: true },
  comment: { type: String, required: true },
  reviewername: { type: String, required: true },
  candid: {
    type: Schema.Types.ObjectId,
    ref: "Candidate"
  }
    
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;