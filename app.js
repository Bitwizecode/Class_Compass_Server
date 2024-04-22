const express = require("express");
const connectDatabase = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ClassCompass ✏️</h1>");
});

app.use("/auth", authRouter);

app.listen(8000, () => {
  connectDatabase();
  console.log("Server is running on", 8000);
});
