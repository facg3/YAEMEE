const handlers = require('./handler');

const cookieChecker = (req, res, cb) => {
  const endpoint = req.url;
  if (!req.headers.cookie && endpoint !== '/' && !endpoint.startsWith('/public/')) {
    res.writeHead(302, { location: '/' });
    res.end();
  } else if (req.headers.cookie && endpoint === '/') {
    handlers.handleHomePage(req, res);
  } else {
    cb(req, res);
  }
};

module.exports = cookieChecker;
