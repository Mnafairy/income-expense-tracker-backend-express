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
exports.createTable = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE TABLE users (id VARCHAR(255),email VARCHAR(255), name VARCHAR(255),password  VARCHAR(255)`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "created table" });
};
