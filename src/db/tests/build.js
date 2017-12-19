const connect = require('./db_connection');
const fs = require('fs');

const sql = fs.readFileSync(`${__dirname}/build.sql`).toString();
connect.query(sql, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});
