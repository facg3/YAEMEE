const connect = require('../db_connection');

const getLoginInfoFromDB = (username, cb) => {
  const sqlQuery = `SELECT * FROM users WHERE username='${username}'`;
  connect.query(sqlQuery, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  getLoginInfoFromDB,
};
