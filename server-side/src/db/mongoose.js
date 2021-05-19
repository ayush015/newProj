//Imports
require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.DATABASE
  ? process.env.DATABASE
  : "mongodb://localhost:27017/BloggersSpot";
console.log(process.env.DATABASE);
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//DB responses
const connection = mongoose.connection;

connection.once("open", () => console.log("DB is connected"));
