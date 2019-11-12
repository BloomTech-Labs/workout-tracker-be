const db = require('../data/firstrep.db3');

module.exports = {
    find,
    findBydId,
    add,
    update,
    remove
};

function find() {
    return db('member_table')
}

function findBydId(id) {
    return db('member_table').where({ id }).first();
}

function add(user) {
    return db('member_table').insert(user)
    .then(ids => {
        return findBydId(ids[0])
    });
}

function update(id, changes) {
    return db('member_table').where({ id }).update(changes);
}

function remove(id) {
    return db('member_table').where({ id }).del()
}