require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { signup } = require("./route/signup");
const { getUsers } = require("./route/get-users");
const { createTable } = require("./route/create-table");
const { deleteUser } = require("./route/delete-user");
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.post("/signup", signup);
router.get("/get-users", getUsers);
router.get("/create-table", createTable);
router.delete("/delete-user", deleteUser);
app.use(router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
