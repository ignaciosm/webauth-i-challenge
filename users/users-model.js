const db = require('../database/db-config.js');

module.exports = {
  all,
  create,
  findBy
}

function all() {
  return db('users')
  .select('id', 'username','password')
};

function create(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return all();
    });
};

function findBy(filter) {
  return db("users")
    .select('id', 'username','password')
    .where(filter)
};