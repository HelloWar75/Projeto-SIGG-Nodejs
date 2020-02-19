const server = require('./config/server').server;
const port = require('./config/server').port;
const router = require('./routes/router');

server.listen(port, (router) => {
    console.log("Servidor inciado => " + port);
});