const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  mgrid: { type: String, required: true },
  candid: { type: String, required: true }
    
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;