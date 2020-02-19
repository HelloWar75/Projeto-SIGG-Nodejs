const router = require('../config/server').server
const likeService = require('../services/like');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.get('/like/is_liked', (request, response, next) => {
    let old_token = request.headers["authorization"].replace('Bearer ', '');
    jwt.verify(old_token, config.jwt.secret, (err, user) => {
        if( err ) {
            response.send(503, {
                status: 'error',
                error: err
            });
        }

        let uid = user.uid;

        likeService.hasLike(uid).then(res => {
            let isLiked = false;
            if ( res !== null )
            {
                isLiked = true;
            }

            response.send(200, {
                status: 'success',
                isLiked: isLiked
            });
        });

    });
    next();
});

router.get('/likes', (request, response, next) => {
    likeService.getAllVotes(1).then(res => {
        let likedNum = res.length;
        likeService.getAllVotes(2).then(res2 => {
            let dlikedNum = res2.length;
            response.send(200, {
                status: 'success',
                likedNum: likedNum,
                dlikedNum: dlikedNum
            });
        });
    });
    next();
});

router.get('/like', (request, response, next) => {
    let old_token = request.headers["authorization"].replace('Bearer ', '');
    jwt.verify(old_token, config.jwt.secret, (err, user) => {
        if( err ) {
            response.send(503, {
                status: 'error',
                error: err
            });
        }

        let uid = user.uid;

        likeService.hasLike(uid).then(res => {
            let isLiked = false;
            if ( res !== null )
            {
                response.send(200, {
                    status: 'isVoted'
                });
            }else{
                likeService.registerVote(uid, 1).then(d => {
                    if( d ) {
                        response.send(200, {
                            status: 'success'
                        });
                    }
                });
            }
            
        });

    });
    next();
})

router.get('/dlike', (request, response, next) => {
    let old_token = request.headers["authorization"].replace('Bearer ', '');
    jwt.verify(old_token, config.jwt.secret, (err, user) => {
        if( err ) {
            response.send(503, {
                status: 'error',
                error: err
            });
        }

        let uid = user.uid;

        likeService.hasLike(uid).then(res => {
            let isLiked = false;
            if ( res !== null )
            {
                response.send(200, {
                    status: 'isVoted'
                });
            }else{
                likeService.registerVote(uid, 2).then(d => {
                    if( d ) {
                        response.send(200, {
                            status: 'success'
                        });
                    }
                });
            }
            
        });

    });
    next();
})