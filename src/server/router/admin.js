const router = require('express').Router();

const rLib = require('./router-lib');

const Admin = require('./../controllers/admin');
const txtService = require('./../services/nexmo');

router.get('/user-list', Admin.userList);
router.get('/logs', Admin.getLogs);
router.get('/update-all-users', Admin.updateAllUsers);
router.post('/user/:userToRemove/remove', Admin.removeUser);
router.get('/txt/check-balance', rLib.requireAuth, rLib.requireAdmin, txtService.checkBalance);

module.exports = router;
