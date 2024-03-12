require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { signup } = require("./route/signup");
const { getUsers } = require("./route/get-users");
const { createTable } = require("./route/create-table");

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.post("/signup", signup);
router.get("/get-users", getUsers);
router.get("/create-table", createTable);
app.use(router);

// app.get("/delete-table", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query("DROP TABLE users");
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }
//   res.status(200).send({ message: "deleted table" });
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
