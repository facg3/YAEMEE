const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 6060;

server.listen(port, () => {
  console.log(`Magic Happen on port ${port}`);
});
