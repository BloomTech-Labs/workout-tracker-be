const bcrypt = require('bcryptjs');
const db = require('../database/db-config')

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db('member_table')
  .insert({
    username: req.body.username,
    password: hash
  })
}

module.exports = {
  comparePass,
  createUser
};