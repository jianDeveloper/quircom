const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/database.js");
const contactRouter = require("./routes/register.js");

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("This is the main page of the api");
});

app.use("/api/userReg", contactRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running at port " + process.env.PORT);
});