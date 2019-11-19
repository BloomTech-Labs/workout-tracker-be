
exports.up = function(knex) {
  return knex.schema.createTable('member_exercises', tbl => {
    tbl.increments();
    tbl.integer('member_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('member_table');
    tbl.integer('routine_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('routines');
    tbl.integer('date')
})
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('member_exercises')
};
