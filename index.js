const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./database/db");
dotenv.config();
const app = express();


app.listen(8000, () => {
   connectDatabase();
  console.log("server is running on port 8000");
});
