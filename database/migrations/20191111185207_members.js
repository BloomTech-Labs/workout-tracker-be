
exports.up = function(knex) {
  return knex.schema.createTable('member_table', tbl => {
      tbl.increments();
      tbl.string('first_name', 128).notNullable();
      tbl.string('last_name', 128).notNullable();
      tbl.string('email', 128).notNullable();
      tbl.string('username', 128).notNullable();
      tbl.string('password', 255).notNullable();
  })
  .createTable('member_status', tbl => {
      tbl.increments();
      tbl.integer('weight').notNullable();
      tbl.integer('height').notNullable();
      tbl.integer('bmi').notNullable();
      tbl.integer('bench_max').notNullable();
      tbl.integer('squat_max').notNullable();
      tbl.integer('mile_time').notNullable();
      tbl.timestamp('exercise_date').defaultTo(knex.fn.now());
      tbl.integer('member_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('member_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('member_status')
        .dropTableIfExists('member_table')
};
