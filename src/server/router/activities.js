const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Activ = require('./../controllers/activities');


router.get('/one-week/:weeksPast', requireAuth, Activ.getWeekOfActivities);
router.get('/one-week', requireAuth, Activ.getWeekOfActivities);

module.exports = router;
