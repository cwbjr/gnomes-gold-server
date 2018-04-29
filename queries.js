const database = require('./database-connection');
// const connect = require('./database-connection');


module.exports = {
  // getAll() {
  //   return connect('user');
  // },
  // getOne(id) {
  //   return connect('user')
  //     .where('id', id)
  //     .first();
  // },
  // create(user) {
  //   return connect('user')
  //     .insert(user, 'id')
  //     .then(ids => {
  //       return ids[0];
  //     });
  // },
  // update(id, user) {
  //   return connect('user')
  //     .where('id', id)
  //     .update(user);
  // },
  // delete(id) {
  //   return connect('user')
  //     .where('id', id)
  //     .del();
  // }
  list() {
    return database('user')
      .select('*');
  },
  read(id) {
    return database('user')
      .select('*')
      .where('id', id)
      .first();
  },
  create(user) {
    return database('user')
      .insert(user)
      .returning('*')
      .then(record => record[0]);
  },
  update(id, user) {
    return database('user')
      .update(user)
      .where('id', id)
      .returning('*')
      .then(record => record[0]);
  },
  delete(id) {
    return database('user')
      .delete()
      .where('id', id);
  }
};
