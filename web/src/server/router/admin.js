const router = require('express').Router();

const rLib = require('./router-lib');

const Admin = require('./../controllers/admin');

router.get('/user-list', Admin.userList);
// router.get('/nightly-update', requireAuth, requireAdmin, Admin.nightlyUpdate);

module.exports = router;
