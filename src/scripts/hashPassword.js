const bcrypt = require('bcryptjs');

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      cb(null, hash);
    });
  });
};

const comparePasswords = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    cb(null, res);
  });
};

module.exports = {
  hashPassword,
  comparePasswords,
};
