"use strict";

const service = require('../services/user');

exports.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {

        service.findUser(username).then(data => {
            if( data !== null )
            {
                if( data.password === password )
                {
                    resolve({
                        uid: data.id,
                        username: data.username,
                        role: data.role
                    });
                }else{
                    reject({
                        'status': 'error',
                        'errors': {
                            password: "Senha não confere!"
                        }
                    });
                }
            }else{
                reject({
                    'status': 'error',
                    'errors': {
                        password: "Usuário não encontrado!"
                    }
                });
            }
        }).catch(err => {
            reject({
                'status': 'error',
                'errors': {
                    password: "Usuário não encontrado!"
                }
            });
        });
    })
}