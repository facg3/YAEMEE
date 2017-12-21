const connect = require('../db_connection');

const getLoginInfoFromDB = (username, cb) => {
  const sqlQuery = `SELECT * FROM users WHERE username='${username}'`;
  connect.query(sqlQuery, (err, res) => {
    if (err) {
      return cb(err);
    } else if (res.rowCount === 0) {
      return cb(null, 'false_user');
    }
    return cb(null, res.rows[0]);
  });
};

module.exports = {
  getLoginInfoFromDB,
};
