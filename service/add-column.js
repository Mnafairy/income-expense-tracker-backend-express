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
exports.addColumn = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`ALTER TABLE users ADD currency_type varchar(255);`);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "column added succesfully" });
};
