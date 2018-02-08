const router = require('express').Router();

const rLib = require('./router-lib');

const Activ = require('./../controllers/activities');

// All routes require Auth, see indexRoutes
router.get('/weekly-stats/:weeksPast', Activ.getWeeklyStats);
router.get('/weekly-stats', Activ.getWeeklyStats);
router.get('/search-activities', Activ.searchActivities);
router.get('/fitness-today', Activ.fitnessToday);
router.post('/delete-activity', Activ.deleteActivity); // to be removed

module.exports = router;
