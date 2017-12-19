const handlers = require('./handler.js');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.homePage(req, res);
  } else if (endpoint.startsWith('/public/')) {
    handlers.generic(req, res);
  } else if (endpoint === '/login/') {
    handlers.login(req, res);
  } else if (endpoint === '/profile/') {
    handlers.profiles(req, res);
  } else if (endpoint === '/add_post/') {
    handlers.addPost(req, res);
  } else if (endpoint === '/edit_post/') {
    handlers.editPost(req, res);
  } else if (endpoint === '/like_post/') {
    handlers.likePost(req, res);
  } else if (endpoint === '/delete_post/') {
    handlers.deletePost(req, res);
  } else if (endpoint === '/comment/') {
    handlers.comment(req, res);
  } else if (endpoint === '/admin_panel/') {
    handlers.adminPanel(req, res);
  } else if (endpoint === '/add_user/') {
    handlers.addUser(req, res);
  } else if (endpoint === '/delete_user/') {
    handlers.deleteUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1> Path doesn\'t exist.</h1>');
  }
};
module.exports = router;
