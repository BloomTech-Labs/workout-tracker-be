const db = require('../database/db-config')

module.exports = {
    find,
    findBy,
    findByMember,
    add,
    remove
}

function find() {
    return db('routine_favorites');
}

function findBy(filter) {
    return db('routine_favorites').where(filter);
}

function findByMember(user_id) {
    return db('routine_favorites')
        .join('routines as r', 'r.id', 'f.routine_id')
        .select('r.id, r.routine_name')
        .where({ user_id })
}

function add(data) {
    return db('routine_favorites').insert(data)
}

function remove(id, routineId) {
    return db('routine_favorites')
        .where({
            member_id: id,
            routine_id: routineId
        }).del();
}