import axios from "axios";

export default {
  // Gets all JobReqs
  getJobReqs: function() {
    return axios.get("/api/jobreq");
  },
  getJobReqsbyMgr: function(mgrid) {
    return axios.get("../api/jobreq/openreqs/" + mgrid);
  },
  // Gets the JobReq with the given id
  getJobReq: function(id) {
    return axios.get("/api/jobreq/" + id);
  },
  // Deletes the JobReq with the given id
  deleteJobReq: function(id) {
    return axios.delete("/api/jobreq/" + id);
  },
  // Saves a JobReq to the database
  saveJobReq: function(jobreqData) {
    console.log(jobreqData);
    return axios.post("/api/jobreq", jobreqData);
  }
};