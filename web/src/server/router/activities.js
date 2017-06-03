const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Activ = require('./../controllers/activities');


router.get('/weekly-stats/:weeksPast', requireAuth, Activ.getWeeklyStats);
router.get('/weekly-stats', requireAuth, Activ.getWeeklyStats);
router.post('/reset-activity', requireAuth, Activ.resetActivity);
router.post('/delete-activity', requireAuth, Activ.deleteActivity);

module.exports = router;
