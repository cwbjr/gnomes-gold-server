exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
