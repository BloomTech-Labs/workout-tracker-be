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

function findByMember(member_id) {
    return db('routine_favorites as f')
        .join('member_table as m', 'm.id', 'f.member_id')
        .join('routines as r', 'r.id', 'f.routine_id')
        .select('r.id', 'r.name')
        .where({ member_id })
}

function add(data) {
    return db('routine_favorites').insert(data)
}

function remove(filter) {
    return db('routine_favorites').where(filter).del();
}