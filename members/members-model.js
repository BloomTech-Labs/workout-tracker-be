const db = require('../database/db-config');

module.exports = {
    find,
    findBy,
    findBydId,
    findStatus,
    add,
    update,
    remove
};

function find() {
    return db('member_table')
}

function findBy(filter) {
    return db('member_table').where(filter);
  }

function findBydId(id) {
    return db('member_table').where({ id }).first();
}

function findStatus(member_id) {
    return db('member_status as s')
        .join('member_table as m', 'm.id', 's.member_id')
        .select('s.id', 'm.first_name', 's.weight', 's.height', 's.bmi', 's.bench_max', 's.squat_max', 's.mile_time', 's.exercise_date')
        .where({ member_id })
}

function add(user) {
    return db('member_table').insert(user).returning('id')
    .then(ids => {
        return findById(newitem[0]);
    });
}

function update(id, changes) {
    return db('member_table').where({ id }).update(changes);
}

function remove(id) {
    return db('member_table').where({ id }).del()
}