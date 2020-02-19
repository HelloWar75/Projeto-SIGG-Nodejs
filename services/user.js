const models = require('../models');

function findUsers() {
    return new Promise((resolve, reject) => {
        models.User.findAll().then(res => {
            resolve(res);
        }).catch(err => {
            console.log("erro ao buscar usuarios: " + err);
        })
    });
}

function findUser(username) {
    return new Promise((resolve, reject) => {
       models.User.findOne({ where: { username: username } }).then(res => {
           resolve(res);
       }).catch(err => {
           console.log("ERRO");
       });
    });
}

function registerUser(username, password)
{
    return new Promise((resolve, reject) => {
        models.User.create({
            username: username,
            password: password,
            role: 1
        }).then(() => {
            resolve(true);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {findUsers, findUser, registerUser}