
exports.up = function(knex) {
    return knex.schema.createTable('exercise_records', tbl => {
        tbl.increments();
        tbl.integer('exercise_id');
        tbl.integer('routine_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('routines')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        tbl.integer('routine_record_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('member_routine_records')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        tbl.decimal('sets').notNullable();
        tbl.decimal('reps').notNullable();
        tbl.string('notes');
        tbl.timestamp('exercise_date').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('exercise_record')
  };
  