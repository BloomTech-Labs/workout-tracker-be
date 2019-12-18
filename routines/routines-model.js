const db = require('../database/db-config');

module.exports ={
    find,
    findById,
    add,
    remove,
    update,
    remove
}

function find() {
    return db('routines');
}

function findById(id) {
    return db('routines').where({ id }).first();
}

function add(data) {
    return db('routines').insert(data).returning('id')
        .then(newRoutine => {
            return findById(newRoutine[0]);
        });
}

function remove(id) {
    return db('routines').where({ id }).del();
}

function update(id, changes) {
    return db('routines').where({ id }).update(changes)
        .then(update => {
            return findById(id);
        })
}