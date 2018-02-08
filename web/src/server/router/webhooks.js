const router = require('express').Router();

const rLib = require('./router-lib');

const Webhooks = require('./../controllers/webhooks');

// All routes require Auth, see indexRoutes
router.get('/strava-subscriber', Webhooks.stravaSubscriber);
router.get('/strava-receiver', Webhooks.stravaGetReceiver);
router.post('/strava-receiver', Webhooks.stravaPostReceiver);

module.exports = router;
