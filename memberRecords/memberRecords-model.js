const db = require('../database/db-config');

module.exports = {
    find,
    findBydId,
    add,
    update,
    remove
};

function find() {
    return db('member_records')
}

function findBydId(id) {
    return db('member_records').where({ id }).first();
}

function add(user) {
    return db('member_records').insert(user)
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('member_records').where({ id }).update(changes);
}

function remove(id) {
    return db('member_records').where({ id }).del()
}