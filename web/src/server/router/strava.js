const router = require('express').Router();

const Strava = require('./../controllers/strava');


router.get('/user/:id', Strava.getUser);
router.get('/user-activities', Strava.getUserActivities);
router.get('/activities', Strava.getActivities);
router.get('/user-routeplans', Strava.getUserRouteplans);
router.get('/routes/:id', Strava.getRoute);

module.exports = router;
