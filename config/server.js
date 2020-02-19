const restify = require('restify');
const port = 8000;
const server = restify.createServer();

server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: true,
    overrideParams: false
}));

server.get('/', (request, response, next) => {
    const retorno = {
        retorno: 'Rest OK!'
    };

    response.send(200, retorno);
    next();
});

server.listen(port, () => {
    console.log('Servidor iniciado, na porta: ' + port);
});

module.exports = server;