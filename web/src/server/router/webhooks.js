const router = require('express').Router();

const Webhooks = require('./../controllers/webhooks');

// /apiv1/webhooks/strava-receiver/
router.get('/strava-receiver', Webhooks.stravaGetReceiver);
router.post('/strava-receiver', Webhooks.stravaPostReceiver);

module.exports = router;
