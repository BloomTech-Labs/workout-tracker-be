const db = require('../database/db-config')

module.exports = {
    find,
    findBy,
    add,
    remove
}

function find() {
    return db('routine_favorites');
}

function findBy(filter) {
    return db('routine_favorites').where(filter);
}

function add(data) {
    return db('routine_favorites').insert(data)
}

function remove(filter) {
    return db('routine_favorites').where(filter).del();
}