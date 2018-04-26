exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', user => {
    user.increments('id').primary();
    user.string('first_name');
    user.string('last_name');
    user.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
