const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./route/user.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
