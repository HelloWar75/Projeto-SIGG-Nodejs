const router = require('../config/server').server;
const service = require('../services/user');

router.get('/user', (request, response, next) => {
    let old_token = request.headers["authorization"].replace('Bearer ', '');
    jwt.verify(old_token, config.jwt.secret, (err, user) => {
        if( err ) {
            response.send(503, {
                status: 'error',
                error: err
            });
        }

        let username = user.username;

        service.findUser(username).then(data => {
            response.send(200, {
                uid: data.id,
                username: data.username,
                role: data.role
            });
        }).catch(err => {
            response.send(503, err);
        });

    });
    next();
});

module.exports = router;