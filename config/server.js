const restify = require('restify');
const port = 8000;
const server = restify.createServer();
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware')


var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*', 'http://localhost:8080'],
    allowHeaders:["Authorization"],
    exposeHeaders:["Authorization"]
 });

server.pre(cors.preflight);
server.use(cors.actual);

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