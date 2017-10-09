import axios from "axios";

export default {
  // Gets all managers
  getManagers: function() {
    return axios.get("/api/manager");
  },
  // Gets the manager with the given id
  getManager: function(id) {
    return axios.get("/api/manager/" + id);
  },
  // Deletes the manager with the given id
  deleteManager: function(id) {
    return axios.delete("/api/manager/" + id);
  },
  // Saves a manager to the database
  saveManager: function(managerData) {
    return axios.post("/api/manager", managerData);
  }
};