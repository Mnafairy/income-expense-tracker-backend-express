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
const addCategory = async (recordInfo) => {
  const client = await pool.connect();
  let response;
  const query = `INSERT INTO category (id,name,description) VALUES ($1,$2,$3)`;
  const values = [recordInfo.id, recordInfo.name, recordInfo.description];

  try {
    response = await client.query(query, values);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("category added");
  }
  return response.rows;
};

module.exports = { addCategory };
