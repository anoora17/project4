const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// Clear the resumedb collection and insert new records

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ResumeDB",
  {
    useMongoClient: true
  }
);

const candidateSeed = [
  {
    firstname: "George",
    lastname: "Williams",
    email: "gwilliams@gmail.com",
    address: "123 some street",
    city: "Withville",
    state: "GA",
    zipcode: "22111",
    position_type: "Software Developer",
    resume_url: "resume.doc",
    resume_text: "Databases: MySQL, Oracle, Access, SAP Software: Microsoft Office, Remedy, Microsoft SQL Server, DB Artisan, Eclipse, Visual Studio.NET, FrontPage Languages: C#, Java, JavaScript, React, Angular, Visual Basic, ASP, XML, XSL, JWS, SQL, and T-SQL"

  },
  {
    firstname: "Ken",
    lastname: "Fields",
    email: "kfields@gmail.com",
    address: "432 Road Over There",
    city: "Tewitty",
    state: "AL",
    zipcode: "76443",
    position_type: "Software Developer",
    resume_url: "resume.doc",
    resume_text: "Databases: MySQL, Oracle, Access, SAP Software: Microsoft Office, Remedy, Microsoft SQL Server, DB Artisan, Eclipse, Visual Studio.NET, FrontPage Languages: C#, Java, JavaScript, React, Angular, Visual Basic, ASP, XML, XSL, JWS, SQL, and T-SQL"

  },
  {
    firstname: "John",
    lastname: "Bridges",
    email: "jbridges@gmail.com",
    address: "7644 Great Wall",
    city: "Arlington",
    state: "VA",
    zipcode: "22033",
    position_type: "Software Developer",
    resume_url: "resume.doc",
    resume_text: "Databases: MySQL, Oracle, Access, SAP Software: Microsoft Office, Remedy, Microsoft SQL Server, DB Artisan, Eclipse, Visual Studio.NET, FrontPage Languages: C#, Java, JavaScript, React, Angular, Visual Basic, ASP, XML, XSL, JWS, SQL, and T-SQL"

  }

];

db.Candidate
  .remove({})
  .then(() => db.Candidate.collection.insertMany(candidateSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

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