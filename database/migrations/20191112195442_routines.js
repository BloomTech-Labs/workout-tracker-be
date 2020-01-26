
exports.up = function(knex) {
  return knex.schema.createTable('routines', tbl => {
      tbl.increments();
      tbl.string('routine_name').notNullable();
      tbl.string('routine_description').notNullable();
      tbl.integer('member_id')
        .unsigned()
        .references('id')
        .inTable('member_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
  .createTable('routine_exercises', tbl => {
      tbl.increments();
      tbl.integer('exercise_id').notNullable();
      tbl.integer('routine_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('routines')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('routine_exercises')
        .dropTableIfExists('routines')
};
