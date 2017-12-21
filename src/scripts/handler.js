const fs = require('fs');
const path = require('path');
const createToken = require('./createToken');
const hashPwd = require('./hashPassword');
const userQueries = require('../db/queries/user_functions');
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
  let userInfo = '';
  req.on('data', (chunk) => {
    userInfo += chunk;
  });
  req.on('end', () => {
    const userObject = JSON.parse(userInfo);
    userQueries.getLoginInfoFromDB(userObject.username, (err1, result) => {
      if (err1) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('User_not_found');
      } else {
        hashPwd.comparePasswords(userObject.password, result[0].password, (err, result2) => {
          if (err || !result2) {
            let statusCode;
            let msg = '';
            if (err) {
              statusCode = 500;
              msg = 'Server_Error';
            } else {
              statusCode = 200;
              msg = 'Password_is_wrong';
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
            res.end(msg);
          } else {
            const tokenObject = result;
            createToken(tokenObject, (err2, token) => {
              if (err2) {
                console.log('err2', err2);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Token_not_set');
              }
              res.setHeader('Set-Cookie', [`token=${token}`, 'logged_in=true', `username=${result[0].username}`]);
              res.setHeader('Content-Type', 'text/html');
              res.setHeader('X-Foo', 'bar');
              res.writeHead(200);
              return res.end();
            });
          }
        });
      }
    });
  });
};

const handleHomePage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'html', 'home.html'), (error, file) => {
    if (error) {
      res.writeHead(500, { 'content-Type': 'text/html' });
      res.end('<h1> Internal server Error </h1>');
    } else {
      res.writeHead(200, { 'content-Type': 'text/html' });
      res.end(file);
    }
  });
};

const logOut = (req, res) => {
  res.writeHead(302, {
    'Set-Cookie': ['logged_in=false; Max-Age=0;', 'token=1; Max-Age=0;', 'username="0"; Max-Age=0'],
    Location: '/',
  });
  return res.end();
};

module.exports = {
  loginPage,
  generic,
  login,
  handleHomePage,
  logOut,
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
