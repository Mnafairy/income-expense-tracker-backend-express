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
const addRecord = async (recordInfo) => {
  const client = await pool.connect();
  let response;
  const query = `INSERT INTO record (id,name,record_type,description,amount) VALUES ($1,$2,$3,$4,$5)`;
  const values = [
    recordInfo.id,
    recordInfo.name,
    recordInfo.record_type,
    recordInfo.description,
    recordInfo.amount,
  ];
  try {
    response = await client.query(query, values);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("record added");
  }
  return response.rows;
};
module.exports = { addRecord };
