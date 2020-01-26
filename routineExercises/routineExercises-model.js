const db = require('../database/db-config')

module.exports = {
    find,
    findById,
    findByRoutine,
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

function findByRoutine(routine_id) {
    return db('routine_exercises')
        .select('exercise_id')
        .where({ routine_id })
}

function add(data) {
    return db('routine_exercises').insert(data).returning('id')
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