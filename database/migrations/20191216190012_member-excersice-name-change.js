
exports.up = function(knex) {
  knex.schema.renameTable('member_exercises', 'member_routine_records')
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('member_routine_records')
};
