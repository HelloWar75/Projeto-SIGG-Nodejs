const users = require('./routerUsers');
const auth = require('./routerAuth');
const like = require('./routerLikes');

const router = [
    users,
    auth,
    like
];

module.exports = router;