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

const createUsersTable = async (userData) => {
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE TABLE users (id VARCHAR(50) PRIMARY KEY ,email VARCHAR(50) NOT NULL UNIQUE, name VARCHAR(50) NOT NULL,password  VARCHAR(50),currency_type VARCHAR(50))`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  ({ message: "created table" });
};
const createCategoryTable = async (userData) => {
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE TABLE category (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100),description VARCHAR(100))`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  ({ message: "created table" });
};
const createTransTable = async (userData) => {
  const client = await pool.connect();
  try {
    await client.query(
      `
    CREATE TABLE record (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    record_type VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    category_id VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
    )
    `
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  ({ message: "created table" });
};

const addColumn = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`ALTER TABLE users ADD currency_type VARCHAR(255);`);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  ({ message: "column added succesfully" });
};
const deleteTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`DROP TABLE transactions`);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
  ({ message: "table deleted succesfully" });
};
module.exports = {
  createUsersTable,
  addColumn,
  deleteTable,
  createTransTable,
  createCategoryTable,
};
