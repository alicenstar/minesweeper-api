const { pwdSaltRounds } = require('@shared/constants');
const db = require('./db');
const bcrypt = require('bcrypt');

const getUsers = async(request, response) => {
  try {
    const users = await db.any('SELECT * FROM users ORDER BY id ASC');
    response.status(200).json(users);
  } catch(e) {
    throw e;
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const user = await db.one('SELECT * FROM users WHERE id = $1', [id]);
    response.status(200).json(user);
  } catch(e) {
    throw e;
  }
};

const createUser = async (request, response) => {
  const { name, email, password } = request.body;
  bcrypt.hash(password, pwdSaltRounds, async (error, hash) => {
    try {
      const user = await db.one('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hash]);
      response.status(201).send(`User added with ID: ${user.id}`);
    } catch(e) {
      throw e;
    }    
  });
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  try {
    const user = await db.one(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id',
      [name, email, id]
    );
    response.status(201).send(`User modified with ID: ${user.id}`);
  } catch(e) {
    throw e;
  }
};

const createScore = async (request, response) => {
  const { userId, score } = request.body;
  try {
    const user = await db.one(`INSERT INTO scores (user_id, score, timestamp) VALUES ($1, $2, (to_timestamp(${Date.now()} / 1000.0))) RETURNING id`, [userId, score, hash]);
    response.status(201).send(`Score added with ID: ${user.id}`);
  } catch(e) {
    throw e;
  }    
};

module.exports = { getUsers, getUserById, createUser, updateUser, createScore };