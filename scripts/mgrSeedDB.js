const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ResumeDB",
  {
    useMongoClient: true
  }
);


const managerSeed = [
  {
    fullname: "John Reynolds",
    department: "NorthWest IT",
    email: "jreynolds@acme.com",
    password: "test"
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