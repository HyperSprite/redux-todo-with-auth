const router = require('express').Router();

const rLib = require('./router-lib');

const Activ = require('./../controllers/activities');

// All routes require Auth, see indexRoutes
router.post('/:id/delete', Activ.deleteActivity);
router.post('/:id/refresh', Activ.refreshActivity);
router.post('/:id/resest', Activ.resetActivity);
// router.get('/:id', Activ.getActivity);

module.exports = router;
