import axios from "axios";

export default {
  // Gets all reviews
  getReviews: function() {
    return axios.get("/api/review");
  },
  // Gets the review with the given id
  getReview: function(id) {
    return axios.get("/api/review/" + id);
  },
  // Deletes the review with the given id
  deleteReview: function(id) {
    return axios.delete("/api/review/" + id);
  },
  // Saves a review to the database
  saveReview: function(reviewData) {
    return axios.post("/api/review", reviewData);
  }
};