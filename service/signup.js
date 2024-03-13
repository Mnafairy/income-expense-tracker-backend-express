const { Pool } = require("pg");

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

exports.signup = async (req, res) => {
  const newUser = req.body;
  const client = await pool.connect();
  const query = `INSERT INTO users (id,email,name,password) VALUES ('${newUser.id}','${newUser.email}','${newUser.name}','${newUser.password}');`;
  try {
    client.query(query);
  } catch (e) {
    console.log(e);
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }

  res.status(201).send({ message: "User Added" });
};

