import axios from "axios";

export default {
  // Gets all candidates
  getCandidates: function() {
    return axios.get("/api/candidate");
  },
  // Gets the candidate with the given id
  getCandidate: function(id) {
    return axios.get("/api/candidate/" + id);
  },
  // Deletes the candidate with the given id
  deleteCandidate: function(id) {
    return axios.delete("/api/candidate/" + id);
  },
  // Saves a candidate to the database
  saveCandidate: function(candidateData) {
    return axios.post("/api/candidate", candidateData);
  }
};