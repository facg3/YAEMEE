const cookieChecker = (req, res, cb) => {
  if (!req.headers.cookie) {
    cb(req, res);
  }
};

module.exports = cookieChecker;
