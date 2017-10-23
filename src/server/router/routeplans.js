const router = require('express').Router();

// const rLib = require('./router-lib');

const rts = require('./../controllers/routeplans');

// All routes require Auth, see indexRoutes
router.post('/refresh', rts.refreshRouteplan);
router.delete('/delete', rts.deleteRouteplan);
router.get('/search', rts.searchRouteplan);
router.get('/:routeplanId', rts.getRouteplan);
router.get('/user/:stravaId', rts.getUserRouteplans);
router.get('/user/refresh/:stravaId', rts.userRouteplanRefresh);

module.exports = router;
