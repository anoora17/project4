const db = require("../models");

// Defining methods for the candidateController
module.exports = {
  findAll: function(req, res) {
   
    db.Candidate
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Candidate
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Candidate
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Candidate
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Candidate
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  find: function(req, res) {
    
    db.Candidate
      .find({ $resume_text_text: { $search: req.params.text } })
      .sort({ score: { $meta: "textScore" } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  console.log(req.params.text);
    }
};
