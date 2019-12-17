
exports.up = function(knex) {
  knex.schema.renameTable('member_exercises', 'member-routine-records')
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('member-routine-records')
};
