const db = require("../models");

// Defining methods for the managerController
module.exports = {
  findAll: function(req, res) {
    db.Manager
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Manager
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
<<<<<<< HEAD
     db.Manager
=======
    db.Manager
>>>>>>> 8348173703e4f676d0276bc317b05c539352d9e9
      .find({ email: req.params.email })
      .then(dbModal => res.json(dbModel))
      .catch(er => res.status(422).json(err));
  },
  create: function(req, res) { 
   console.log(req.body)   
    db.Manager
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Manager
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Manager
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
