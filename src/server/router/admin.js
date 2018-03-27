const router = require('express').Router();

const Admin = require('./../controllers/admin');
const txtService = require('./../services/nexmo');

router.get('/user-list', Admin.userList);
router.get('/logs', Admin.getLogs);
router.get('/update-all-users', Admin.updateAllUsers);
router.post('/user/:userToRemove/remove', Admin.removeUser);
router.post('/activities/processing-status/:stravaId', Admin.processingStatusOne);
router.get('/activities/processing-status-all', Admin.processingStatusAll);
router.get('/txt/check-balance', txtService.checkBalance);

module.exports = router;
