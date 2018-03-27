const router = require('express').Router();

const rLib = require('./router-lib');

const Activ = require('./../controllers/activities');
const ActivSearch = require('./../controllers/activities-search');

// All routes require Auth, see indexRoutes
router.get('/weekly-stats/:weeksPast', Activ.getWeeklyStats);
router.get('/weekly-stats', Activ.getWeeklyStats);
router.get('/search-activities', ActivSearch.searchActivities);
router.get('/fitness-today', ActivSearch.fitnessToday);
router.get('/processing-status', Activ.processingStatus);
router.post('/delete-activity', Activ.deleteActivity); // to be removed

module.exports = router;
