const db = require('../database/db-config');

module.exports = {
    find,
    findBy,
    findBydId,
    add,
    update,
    remove
};

function find() {
    return db('member_table')
}

function findBy(filter) {
    return db('member_table').where(filter);
  }

function findBydId(id) {
    return db('member_table').where({ id }).first();
}

function add(user) {
    return db('member_table').insert(user)
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('member_table').where({ id }).update(changes);
}

function remove(id) {
    return db('member_table').where({ id }).del()
}