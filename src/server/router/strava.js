const router = require('express').Router();

const Strava = require('./../controllers/strava');

router.get('/routes/:id', Strava.getRoute);
router.get('/user/:id', Strava.getUser);
router.get('/user-activities', Strava.getUserActivities);
router.get('/activities', Strava.getActivities);

module.exports = router;
