const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRouter = require("./route/user.js");
const tableRouter = require("./route/table.js");
const recordRouter = require("./route/record.js");
const categoryRouter = require("./route/record.js");

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(tableRouter);
app.use(recordRouter);
app.use(categoryRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
