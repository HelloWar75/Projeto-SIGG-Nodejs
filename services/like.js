const models = require('../models');


function hasLike(uid){
    return new Promise((resolve, reject) => {
        models.Votes.findOne({ where: { user_id: uid } }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log("ERRO");
        });
    });
}

function getAllVotes(type) {
    return new Promise((resolve, reject) => {
        models.Votes.findAll({ where: { vote_type: type } }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
        });
    });
}

function registerVote(uid, type)
{
    return new Promise((resolve, reject) => {
        models.Votes.create({
            user_id: uid,
            vote_type: type
        }).then(() => {
            resolve(true);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {hasLike, getAllVotes, registerVote}