const database = require('./database-connection');

module.exports = {
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
