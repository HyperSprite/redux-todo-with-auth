const router = require('express').Router();

const rLib = require('./router-lib');

const Activ = require('./../controllers/activities');

// All routes require Auth, see indexRoutes
router.get('/weekly-stats/:weeksPast', Activ.getWeeklyStats);
router.get('/weekly-stats', Activ.getWeeklyStats);
router.post('/reset-activity', Activ.resetActivity);
router.post('/delete-activity', Activ.deleteActivity);
router.get('/search-activities', Activ.searchActivities);

module.exports = router;
