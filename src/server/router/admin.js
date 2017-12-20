const router = require('express').Router();

const rLib = require('./router-lib');

const Admin = require('./../controllers/admin');

router.get('/user-list', Admin.userList);
router.get('/logs', Admin.getLogs);
router.get('/update-all-users', Admin.updateAllUsers);

module.exports = router;
