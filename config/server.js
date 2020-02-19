const restify = require('restify');
const port = 8000;
const server = restify.createServer();
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const config = require('./config');

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(rjwt(config.jwt).unless({
    path: [
        '/auth/login',
        '/auth/register',
        '/auth/refresh',
        '/auth/logout'
    ]
}));

module.exports = {server, port};