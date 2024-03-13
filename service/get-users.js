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

const getUsers = async (req, res) => {
  let response;
  const client = await pool.connect();
  try {
    response = await client.query("SELECT * FROM users");
    res.send({ users });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  return response.rows;
  // res.status(200).send({ message: "success" });
};
module.exports = {
  getUsers,
};
