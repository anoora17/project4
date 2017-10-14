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
  },
  //full text search candidate resume_text data
  textsearchCandidate: function(query) {
    console.log(query);
    return axios.get("/api/candidate/txtSearch/" + query);
  },
  uploadeCandResume: function(id, resText) {
    console.log("in the upload resume function");
    return axios.post("/api/candidate/resupload"+ resText);
  }
};