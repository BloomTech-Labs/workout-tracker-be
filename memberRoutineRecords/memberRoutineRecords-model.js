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
    return db('member_routine_records').insert(record).returning('id')
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('member_routine_records').where({ id }).update(changes)
        .then(update => {
            return findBydId(1);
        })
}

function remove(id) {
    return db('member_routine_records').where({ id }).del()
}