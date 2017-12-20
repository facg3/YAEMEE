const handlers = require('./handler');

const cookieChecker = (req, res, cb) => {
  console.log('cookie checker', req.headers.cookie);
  if (!req.headers.cookie) {
    cb(req, res);
  } else {
    cb(req, res);
  }
};

module.exports = cookieChecker;
