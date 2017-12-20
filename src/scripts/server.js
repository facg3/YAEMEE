const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Magic Happen on port ${port}`);
});
