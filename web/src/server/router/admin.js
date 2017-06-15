const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Admin = require('./../controllers/admin');

router.get('/user-list', requireAuth, Admin.userList);

module.exports = router;
