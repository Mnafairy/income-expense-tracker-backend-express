const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pgConif = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConif);

app.get("/users", async (req, res) => {
  const client = await pool.connect();
  try {
    client.query("SELECT * FROM users");
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "success" });
});

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const client = await pool.connect();
  const query = `INSERT INTO users (name, age, email) VALUES ('${newUser.name}','${newUser.age}','${newUser.email}');`;
  try {
    client.query(query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  res.status(200).send({ message: "User Added successfully" });
});

// app.delete("/delete", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query("DROP TABLE test");
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }

//   res.status(200).send({ message: "success" });
// });

// app.patch("/update-user", async (req, res) => {
//   const user = req.body;
//   const client = await pool.connect();
//   try {
//     client.query(
//       `UPDATE users SET name = '${user.name}', age= '${user.age}' WHERE email ='Khuslen@gmail.com' `
//     );
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release;
//   }
//   res.status(200).send({ message: "success" });
// });

app.get("/init", async (req, res) => {
  const client = await pool.connect();
  try {
    client.query("CREATE TABLE test (name VARCHAR(255), age INT)");
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }

  res.status(200).send({ message: "success" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
