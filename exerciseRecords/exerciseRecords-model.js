const db = require('../database/db-config');

module.exports = {
    find,
    findBydId,
    findByRoutine,
    add,
    update,
    remove
};

function find() {
    return db('exercise_records')
}

function findBydId(id) {
    return db('exercise_records').where({ id }).first();
}

function findByRoutine(routine_id) {
    return db('exercise_records')
        .where({ routine_id })
}

function add(record) {
    return db('exercise_records').insert(record).returning('id')
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('exercise_records').where({ id }).update(changes)
        .then(update => {
            return findBydId(id)
        })
}

function remove(id) {
    return db('exercise_records').where({ id }).del()
}