const db = require('../database/db-config')

module.exports = {
    find,
    findById,
    findBy,
    add,
    update,
    remove
}

function find() {
    return db('routine_exercises');
}

function findById(id) {
    return db('routine_exercises').where({ id }).first();
}

function findBy(filter) {
return db('routine_exercises').where(filter)
}

function add(data) {
    return db('routine_exercises').insert(data)
        .then(newitem => {
            return findById(newitem[0]);
        });
}

function remove(id) {
    return db('routine_exercises').where({ id }).del();
}

function update(id, changes) {
    return db('routine_exercises').where({ id }).update(changes)
        .then(update => {
            return findById(id);
        })
}