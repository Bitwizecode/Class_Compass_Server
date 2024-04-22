const { connect, set } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
set("strictQuery", false);

async function connectDatabase() {
  try {
    await connect(
      "mongodb://bitwizecode:Demo@12345@cluster0.whysntx.mongodb.net/class_compass"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error from Backend : ", error);
  }
}
module.exports = connectDatabase;
