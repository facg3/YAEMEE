const fs = require('fs');
const path = require('path');
// const post = require('../db/queries/post_functions');
// const user = require('../db/queries/user_functions');

const loginPage = (request, response) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'html', 'login.html'), (error, file) => {
    if (error) {
      response.writeHead(500, { 'content-Type': 'text/html' });
      response.end('<h1> Internal server Error </h1>');
    } else {
      response.writeHead(200, { 'content-Type': 'text/html' });
      response.end(file);
    }
  });
};
const generic = (request, response) => {
  const endpoint = request.url;
  const extension = endpoint.split('.')[1];
  const fileType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    json: 'application/json',
  };
  fs.readFile(path.join(__dirname, '..', '..', endpoint), (error, file) => {
    if (error) {
      response.writeHead(500, 'content-Type:text/html');
      response.end('<h1> Internal server Error </h1>');
    } else {
      response.writeHead(200, `content-Type:${fileType[extension]}`);
      response.end(file);
    }
  });
};

const login = (req, res) => {

};

module.exports = {
  loginPage,
  generic,
  login,
  // handleHomePage,
  // profiles,
  // addPost,
  // editPost,
  // likePost,
  // deletePost,
  // comment,
  // adminPanel,
  // addUser,
  // deleteUser,

};
