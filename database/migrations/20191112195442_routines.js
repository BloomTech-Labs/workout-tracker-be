
exports.up = function(knex) {
  return knex.schema.createTable('routines', tbl => {
      tbl.increments();
      tbl.string('routine_name').notNullable();
      tbl.string('routing_description').notNullable();
      tbl.integer('member_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('member_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
  .createTable('routine_exercises', tbl => {
      tbl.increments();
      tbl.integer('member_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('member_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('routine_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('routines')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.date('exercise_date').notNullable();
  })
};

exports.down = function(knex) {
  
};
