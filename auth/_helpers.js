const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
// require Members

const Members = require("../members/members-model");

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(userdata) {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(userdata.password, salt);
  const actualData = {
    ...userdata,
    password: hashedPassword
  };

  return Members.add(actualData);
}

module.exports = {
  comparePass,
  createUser
};
