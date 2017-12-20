const jwt = require('jsonwebtoken');

const setCookies = (userInfo, cb) => {
  const payload = {
    type: userInfo[0].type,
    user_id: userInfo[0].id,
    user_name: userInfo[0].username,
  };
  return jwt.sign(payload, 'shhhh', (err, token) => {
    if (err) {
      cb(err);
    }
    cb(null, token);
  });
};

module.exports = setCookies;
