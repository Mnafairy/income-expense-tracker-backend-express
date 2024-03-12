const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

exports.signup = async (req, res) => {
  const newUser = req.body;
  const client = await pool.connect();
  const query = `INSERT INTO users (id,email,name,password) VALUES ('${uuidv4()}','${
    newUser.email
  }','${newUser.name}','${newUser.password}');`;
  try {
    client.query(query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  res.status(201).send({ message: "User Added" });
};
