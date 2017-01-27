const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Resources = require('./../controllers/resources');

router.get('/:resTarget', Resources.resource);

module.exports = router;
