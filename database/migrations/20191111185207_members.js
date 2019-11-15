
exports.up = function(knex) {
  return knex.schema.createTable('member_table', tbl => {
      tbl.increments();
      tbl.string('first_name', 128).notNullable();
      tbl.string('last_name', 128).notNullable();
      tbl.string('Email', 128).notNullable();
  })
  .createTable('member_status', tbl => {
      tbl.increments();
      tbl.integer('weight').notNullable();
      tbl.integer('height').notNullable();
      tbl.integer('bmi').notNullable();
      tbl.integer('bench_max');
      tbl.integer('squat_max');
      tbl.integer('mile_time');
  })
  .createTable('member_records', tbl => {
      tbl.increments();
      tbl.string('value', 128).notNullable();
      tbl.integer('date').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('member_records')
        .dropTableIfExists('member_status')
        .dropTableIfExists('member_table')
};
