
exports.up = function(knex) {
  return knex.schema.createTable('member_exercises', tbl => {
    tbl.increments();
    tbl.integer('member_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('member_table')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.integer('routine_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('routines')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.integer('date')
})
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('member_exercises')
};
