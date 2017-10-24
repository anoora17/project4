const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// empty the resume manager collection and insert new dummy records for test

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ResumeDB",
  {
    useMongoClient: true
  }
);


const managerSeed = [
  {
    fullname: "Jeff Bridges",
    department: "NorthWest IT",
    email: "jreynolds@acme.com",
    password: "test",
    jobreq: [{title: "Systems Administrator", description: "Provides systems administration", salary: 100000.00, reqskills: "Win Server 2012 Admin, Active Directory"},
    {title: "Software Developer", description: "Web App Devlopment", salary: 100000.00, reqskills: "React, Angular, Javascript"}]
  },
  {
    fullname: "Linda Shields",
    department: "SouthEast IT",
    email: "lshields@acme.com",
    password: "test"
  },
  {
    fullname: "Alice Winston",
    department: "NorthEast IT",
    email: "awinston@acme.com",
    password: "test"
  },
  {
    fullname: "Mark Brightstone",
    department: "SouthEast IT",
    email: "mbrightstone@acme.com",
    password: "test"
  },
  {
    fullname: "Lance Arms",
    department: "MidWest IT",
    email: "larms@acme.com",
    password: "test"
  }

];

db.Manager
  .remove({})
  .then(() => db.Manager.collection.insertMany(managerSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });