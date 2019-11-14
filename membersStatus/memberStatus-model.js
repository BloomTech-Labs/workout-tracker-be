const db = require('../data/firstrep.db3')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('member_status')
}

function findById(id) {
    return db('member_status').where({ id }).first();
}

function add(sattus) {
    return db('member_status').insert(status)
    .then(ids => {
        return findById(ids[0])
    });
}

function update(id, changes) {
    return db('member_status').where({ id }).update(changes);
}

function remove(id) {
    return db('member_status').where({ id }).del()
}