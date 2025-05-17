const pool = require('../db'); // Import PostgreSQL connection

// Create a new user
const createUser = async (name, email, hashedPassword, role) => {
  const res = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  return res.rows[0]; // return the created user
};

// Find a user by email
const getUserByEmail = async (email) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0]; // if found, return user object; else undefined
};

module.exports = {
  createUser,
  getUserByEmail
};
