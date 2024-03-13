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

const addUser = async (userInfo) => {
  const client = await pool.connect();
  let response;
  const query = `INSERT INTO users (id,name,email,password) VALUES ($1,$2,$3,$4)`;
  const values = [
    userInfo.id,
    userInfo.name,
    userInfo.email,
    userInfo.password,
  ];

  try {
    response = await client.query(query, values);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("user added");
  }
  return response.rows;
};
const deleteUser = async (userId) => {
  const client = await pool.connect();
  let response;
  const query = `DELETE FROM users WHERE id=$1`;
  try {
    response = await client.query(query, [userId]);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
};
const getUsers = async () => {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query("SELECT * FROM users");
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
};
const currencyUpdate = async (userInfo) => {
  const client = await pool.connect();
  let response;
  const query = `UPDATE users SET currency_type=${userInfo.currency} WHERE id=${userInfo.id}`;
  try {
    response = await client.query(query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("Currency select success");
  }
  return response.rows;
};
const login = async (userInfo) => {
  const client = await pool.connect();
  let response;
  const query = `SELECT * FROM users WHERE (email='${userInfo.email}' AND password='${userInfo.password}');`;
  try {
    response = await client.query(query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
};
module.exports = {
  addUser,
  deleteUser,
  getUsers,
  currencyUpdate,
  login,
};
