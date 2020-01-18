
exports.up = function(knex) {
  return knex.schema.createTable('member_routine_records', tbl => {
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
      tbl.timestamp('date').defaultTo(knex.fn.now());
})
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('member_routine_records')
};