require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter = require("./route/user.js");

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
