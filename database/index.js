const { connect, set } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); 
 
set("strictQuery", false); 
  
async function connectDatabase() {
  try {  
    console.log(process.env.MONGO_URI); 
    await connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error From Database : ", error);
  }
}

module.exports=connectDatabase;