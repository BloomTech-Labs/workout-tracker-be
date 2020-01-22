
exports.up = function(knex) {
    return knex.schema.createTable('routine_favorites', tbl => {
      tbl.integer('user_id')
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
      tbl.primary(['user_id', 'routine_id'])
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('routine_favorites')
  };