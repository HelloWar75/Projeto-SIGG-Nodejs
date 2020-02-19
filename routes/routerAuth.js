const router = require('../config/server').server;
const authLib = require('../lib/userAuth');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userService = require('../services/user');
const validator = require('validator');

router.post('/auth/login', (request, response, next) => {
    let {username, password} = request.body;
    authLib.authenticate(username, password).then(data => {
        let token = jwt.sign(data, config.jwt.secret, {
            expiresIn: '30m'
        });

        response.send(200, { 'status': 'success' }, { 'Authorization': token });

    }).catch(err => {
        response.send(401, err);
    });
    next();
});

router.post('/auth/register', (request, response, next) => {
    let {username, password, password_confirmation} = request.body;
    var errors = {};
    
    //Validar formulário
    if( username.length < 8 ) {
        errors['username'] = "Usuário precisa ser igual ou maior que 8 caracteres.";
    }

    if( password.length < 8 ) {
        errors["password"] = "Senha precisa ser igual ou maior que 8 caracteres!";
    }

    if( password_confirmation < 8 ) {
        errors["password_confirmation"] = "Confirmação de senha precisa ser igual a senha!";
    }

    if( password !== password_confirmation ){
        errors["password_confirmation"] = "Senhas não são iguais! por favor revisar!";
    }

    if (Object.keys(errors).length > 0)
    {
        //Se tiver erros
        response.send(422, {
            status: 'error',
            errors: errors,
            error: 'registration_validation_error'
        });
    }

    userService.findUser(username).then(res => {
        if ( res !== null ) {
            response.send(422, {
                status: 'error',
                errors: 'User Exist'
            });
        }else{
            userService.registerUser(username, password).then(data => {
                if( data ) {
                    response.send(200, {
                        status: 'success'
                    });
                }else{
                    response.send(422, {
                        status: 'error',
                        errors: 'Not Created'
                    });
                }
            }).catch(err => {
                response.send(400, {
                    status: 'error',
                    errors: err
                });
            });
        }
    });

});

router.get('/auth/refresh', (request, response, next) => {
    let old_token = request.headers["authorization"].replace('Bearer ', '');
    jwt.verify(old_token, config.jwt.secret, (err, user) => {
        if( err ) {
            response.send(503, {
                status: 'error',
                error: err
            });
        }

        newToken = jwt.sign({
            uid: user.uid,
            username: user.username,
            role: user.role
        }, config.jwt.secret, {
            expiresIn: '30m'
        });

        response.send(200, { 'status': 'success' }, { 'Authorization': newToken });
    });
    next();
});

router.get('/auth/logout', (request, response, next) => {
    response.send(200, { status: 'success' });
    next();
});

module.exports = router;