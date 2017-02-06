const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Strava = require('./../controllers/strava');

router.get('/routes/:id', requireAuth, Strava.getRoute);

module.exports = router;
