exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          first_name: 'charles',
          last_name: 'ballew',
          email: 'ballew@gmail.com'
        },
        {
          id: 2,
          first_name: 'poi',
          last_name: 'ninja',
          email: 'ninja@gmail.com'
        },
        {
          id: 3,
          first_name: 'tonka',
          last_name: 'truck',
          email: 'truck@gmail.com'
        }
      ]);
    }).then(() => {
      return knex.raw('ALTER SEQUENCE user_id_seq RESTART WITH 4;');
    });
};
