const jwt = require('jsonwebtoken');

const setCookies = (userInfo, cb) => {
  const payload = {
    type: userInfo.type,
    user_id: userInfo.id,
    user_name: userInfo.username,
  };
  return jwt.sign(payload, 'shhhh', (err, token) => {
    if (err) {
      cb(err);
    }
    cb(null, token);
  });
};

module.exports = setCookies;
