const { Pool } = require("pg");

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

exports.getUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    client.query("SELECT * FROM users");
    res.send({ users });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  // res.status(200).send({ message: "success" });
};
