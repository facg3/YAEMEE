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
  console.log('Im back', req.headers.cookie);
  let userInfo = '';
  req.on('data', (chunk) => {
    userInfo += chunk;
  });
  req.on('end', () => {
    const userObject = JSON.parse(userInfo);
    userQueries.getLoginInfoFromDB(userObject.username, (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('User_not_found');
      } else {
        hashPwd.comparePasswords(userObject.password, result[0].password, (err, result2) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Password_is_wrong');
          } else {
            const tokenObject = result;
            createToken(tokenObject, (err2, token) => {
              if (err2) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Token_not_set');
              }
              console.log('waaawwaawa', token);
              // res.writeHead(200, { 'Set-Cookie': [`token=${token}`] });
              res.setHeader('Set-Cookie', 'token=89218938912');
              res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
              res.setHeader('max-Age', '900000');
              return res.end(token);
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

module.exports = {
  loginPage,
  generic,
  login,
  handleHomePage,
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
