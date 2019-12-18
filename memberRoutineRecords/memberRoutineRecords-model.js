const db = require('../database/db-config');

module.exports = {
    find,
    findBydId,
    add,
    update,
    remove
};

function find() {
    return db('member_routine_records')
}

function findBydId(id) {
    return db('member_routine_records').where({ id }).first();
}

function add(record) {
    return db('member_routine_records').insert(record)
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('member_routine_records').where({ id }).update(changes);
}

function remove(id) {
    return db('member_routine_records').where({ id }).del()
}