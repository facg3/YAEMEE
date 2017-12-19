const { Pool } = require('pg');
const url = require('url');

const env = require('env2');

env('./config.env');


module.exports = new Pool(options);
