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
exports.currencyUpdate = async (req, res) => {
  const newUser = req.body;
  const client = await pool.connect();
  try {
    await client.query(
      `UPDATE users SET currency_type=${newUser.currency} WHERE id=${newUser.id}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "created table" });
};
