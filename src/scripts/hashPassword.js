const bcrypt = require('bcryptjs');

const hashPassword = (pwd, cb) => {
  bcrypt.genSalt(10, (err1, salt) => {
    bcrypt.hash(pwd, salt, (err2, hash) => {
      if (err2) return cb(err2);
      return cb(hash);
    });
  });
};


const comparePasswords = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err3, res) => {
    if (err3) {
      return cb(err3);
    } else if (!res) {
      return cb(null, 'Password_is_wrong');
    }
    return cb(err3, res);
  });
};

module.exports = {
  hashPassword,
  comparePasswords,
};
