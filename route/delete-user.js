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
exports.deleteUser = async (req, res) => {
  const client = await pool.connect();
  try {
    client.query("DELETE FROM users WHERE email='orgil_49@yahoo.com'");
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "user deleted" });
};
